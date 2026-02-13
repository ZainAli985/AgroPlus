import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import JournalNav from "../layout/JournalTopNav.jsx";

export default function GeneralJournalEntry() {
  const dateRef = React.useRef(null);
  const debitSearchRef = React.useRef(null);
  const debitAccountButtonRef = React.useRef(null);
  const debitAmountRef = React.useRef(null);
  // const descriptionRef = React.useRef(null);
  const commentsRef = React.useRef(null);
  const creditAmountRefs = React.useRef([]);
  const creditAccountButtonRefs = React.useRef([]);
  const creditSearchRefs = useRef([]);
  const dropdownWrapperRef = useRef(null);
  const debitListRef = useRef(null);
  const creditListRefs = useRef([]);
  const deleteButtonRefs = React.useRef([]);
  const bulkFileRef = useRef(null);
  const debitDescRef = useRef(null);



  const [accounts, setAccounts] = useState([]);
  const [debitAccount, setDebitAccount] = useState("");
  const [debitSearch, setDebitSearch] = useState("");
  const [debitDropdownOpen, setDebitDropdownOpen] = useState(false);
  const [debitActiveIndex, setDebitActiveIndex] = useState(0);
  const [creditActiveIndexes, setCreditActiveIndexes] = useState({});
  const [bulkFile, setBulkFile] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [debitLineDesc, setDebitLineDesc] = useState("");





  const [creditEntries, setCreditEntries] = useState([
    { account: "", amount: "", search: "", open: false, lineDesc: "" },
  ]);

  const [entryDate, setEntryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // yyyy-mm-dd
  });

  const formatDateInput = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Format as YYYY-MM-DD
    if (digits.length <= 4) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    } else {
      return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
    }
  };

  const handleDateChange = (e) => {
    const formatted = formatDateInput(e.target.value);
    setEntryDate(formatted);
  };


  const [debitAmount, setDebitAmount] = useState("");
  // const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const triggerNotification = (msg, type = "info") => {
    setNotificationMessage("");
    setTimeout(() => {
      setNotificationMessage(msg);
      setNotificationType(type);
    }, 20);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/accounts`);
        const data = await res.json();
        if (res.ok) setAccounts(data);
        else throw new Error(data?.message || "Failed to fetch accounts");
      } catch (error) {
        console.error(error);
        triggerNotification("Error fetching accounts", "error");
      }
    };
    fetchAccounts();
  }, []);

  // // Auto-focus description on mount for better keyboard experience
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     descriptionRef.current?.focus();
  //   }, 100);
  //   return () => clearTimeout(timer);
  // }, []);

  // Set credit account to default to debit account (only for first row if empty)
  useEffect(() => {
    if (debitAccount && creditEntries.length > 0 && !creditEntries[0].account) {
      setCreditEntries((prev) => {
        const copy = [...prev];
        if (!copy[0].account) {
          copy[0] = { ...copy[0], account: debitAccount };
        }
        return copy;
      });
    }
  }, [debitAccount]);

  const handleAddCreditRow = () => {
    setCreditEntries((prev) => [
      ...prev,
      { account: "", amount: "", search: "", open: false, lineDesc: "" },

    ]);
  };

  const handleDeleteCreditRow = (index) => {
    if (creditEntries.length === 1) {
      triggerNotification("At least one credit entry is required!", "warning");
      return;
    }
    setCreditEntries((prev) => prev.filter((_, i) => i !== index));
  };
  const handleCreditChange = (index, field, value) => {
    setCreditEntries((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };

      const debit = Number(parseFloat(String(debitAmount)) || 0);
      const totalCredit = copy.reduce(
        (sum, c) => sum + (Number(parseFloat(c.amount)) || 0),
        0
      );

      const isLastRow = index === copy.length - 1;


      return copy;
    });
  };



  const calcTotalCredit = () =>
    creditEntries.reduce((sum, c) => {
      const n = parseFloat(String(c.amount).trim()) || 0;
      return sum + n;
    }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !debitAccount ||
      String(debitAmount).trim() === "" ||
      !debitLineDesc.trim()
    ) {
      triggerNotification("Please fill all required fields", "warning");
      return;
    }


    const debit = Number(parseFloat(String(debitAmount).trim()) || 0);
    const totalCredit = Number(calcTotalCredit());

    if (Math.abs(debit - totalCredit) > 0.001) {
      triggerNotification("Debit and Credit amounts must be equal!", "error");
      return;
    }

    for (let i = 0; i < creditEntries.length; i++) {
      const c = creditEntries[i];

      if (
        !c.account ||
        String(c.amount).trim() === "" ||
        !c.lineDesc?.trim()
      ) {
        triggerNotification("Please fill all required fields", "warning");
        return;
      }

      if (Number(parseFloat(String(c.amount))) <= 0) {
        triggerNotification("Credit amounts must be greater than 0", "warning");
        return;
      }
    }


    const entryData = {
      description: debitLineDesc,   // main narration
      debitLineDesc,                // debit line narration
      debitAccount,
      debitAmount: debit,

      creditEntries: creditEntries.map((c) => ({
        account: c.account,
        amount: Number(parseFloat(String(c.amount))),
        description: c.lineDesc || "",
      })),

      comments,
      entryDate,
    };


    try {
      const res = await fetch(`${API_BASE_URL}/create-journal-entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entryData),
      });

      const data = await res.json();
      if (res.ok) {
        triggerNotification(data.message || "Journal entry created!", "success");

        setDebitAccount("");
        setDebitAmount("");
        setDebitLineDesc("");     // ✅ ADD THIS LINE
        setCreditEntries([
          { account: "", amount: "", search: "", open: false, lineDesc: "" },
        ]);
        setComments("");

        creditAccountButtonRefs.current = [];
        creditAmountRefs.current = [];
        creditSearchRefs.current = [];
        deleteButtonRefs.current = [];

        setTimeout(() => debitDescRef.current?.focus(), 100);
      }
      else {
        throw new Error(data?.message || "Failed to create journal entry");
      }
    } catch (error) {
      console.error(error);
      triggerNotification(error.message || "Server error while creating entry", "error");
    }
  };

  const totalCredit = calcTotalCredit();
  const debitNumeric = Number(parseFloat(String(debitAmount).trim()) || 0);
  const balanced = Math.abs(debitNumeric - totalCredit) <= 0.001;

  const filterAccounts = (query) =>
    accounts.filter(
      (a) =>
        a.accountName.toLowerCase().includes(query.toLowerCase()) ||
        a.accountType.toLowerCase().includes(query.toLowerCase())
    );
  useEffect(() => {
    const handler = (e) => {
      const cmd = e.ctrlKey || e.metaKey;

      // Open Debit dropdown
      if (cmd && e.shiftKey && e.key === "D") {
        e.preventDefault();
        setDebitDropdownOpen(true);
        setTimeout(() => debitSearchRef.current?.focus(), 0);
      }

      // Open first Credit dropdown
      if (cmd && e.shiftKey && e.key === "C") {
        e.preventDefault();
        setCreditEntries((prev) =>
          prev.map((row, i) => ({ ...row, open: i === 0 }))
        );
        setTimeout(() => {
          creditSearchRefs.current[0]?.focus();
        }, 0);
      }

    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeElement = document.activeElement;

      // Only act if we're focused on a credit amount input
      const index = creditAmountRefs.current.findIndex((el) => el === activeElement);
      if (index === -1) return;

      const row = creditEntries[index];
      if ((e.key === "Delete" || e.key === "Backspace") && !row.account && !row.amount && creditEntries.length > 1) {
        e.preventDefault(); // only prevent if we are deleting the row
        setCreditEntries((prev) => prev.filter((_, i) => i !== index));

        // Focus previous row if exists
        if (index > 0) {
          setTimeout(() => creditAmountRefs.current[index - 1]?.focus(), 0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [creditEntries]);

  // Comprehensive arrow navigation system
  useEffect(() => {
    const handleArrowNavigation = (e) => {
      // Only handle arrow keys
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        return; // Don't interfere with other keys like Backspace, Delete, etc.
      }

      const active = document.activeElement;
      if (!active) return;

      // Check if we should allow normal cursor movement
      const isNumberInput = active.tagName === "INPUT" && active.type === "number";
      const isTextInput = active.tagName === "INPUT" && (active.type === "text" || !active.type);
      const isTextarea = active.tagName === "TEXTAREA";
      const isDateInput = active === dateRef.current;
      const isSearchInput = active === debitSearchRef.current || creditSearchRefs.current.includes(active);

      // Don't interfere with search inputs' dropdown navigation - let their own handlers handle ArrowUp/Down
      if (isSearchInput) {
        const input = active;
        const atStart = input.selectionStart === 0 && input.selectionEnd === 0;
        const atEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length;

        // Only handle horizontal arrows at edges for navigation between fields
        // Let the input's own handler handle ArrowUp/Down for dropdown list navigation
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          // Don't interfere - let the input's onKeyDown handle dropdown navigation
          return;
        }

        // Only handle horizontal arrows when at edges
        if (e.key === "ArrowRight" && !atEnd) return;
        if (e.key === "ArrowLeft" && !atStart) return;
        // If at edge, allow navigation handler below to handle it
      }

      // Allow cursor movement in other inputs/textareas unless at edge
      if ((isNumberInput || isTextInput || isTextarea) && !e.ctrlKey && !e.metaKey && !isSearchInput) {
        const input = active;
        const atStart = input.selectionStart === 0 && input.selectionEnd === 0;
        const atEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length;

        // Only handle if at the edge
        if (e.key === "ArrowRight" && !atEnd) return;
        if (e.key === "ArrowLeft" && !atStart) return;
        if (e.key === "ArrowDown" && !atEnd) return;
        if (e.key === "ArrowUp" && !atStart) return;
      }

      // Don't interfere with dropdown list items navigation (non-input elements)
      if (active.closest('.absolute.z-10') && active.tagName !== "INPUT") {
        return;
      }

      // Handle navigation for date input
      if (isDateInput) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          debitDescRef.current?.focus();
        }
        return;
      }

      // Handle navigation for description
      if (active === debitDescRef.current) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setDebitDropdownOpen(true);
          setTimeout(() => debitSearchRef.current?.focus(), 0);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          dateRef.current?.focus();
        }
        return;
      }

      // Handle navigation for debit account dropdown search (only horizontal arrows at edges)
      if (active === debitSearchRef.current) {
        const input = active;
        const atStart = input.selectionStart === 0 && input.selectionEnd === 0;
        const atEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length;

        // Only handle horizontal navigation at edges - ArrowUp/Down handled by input's own handler
        if (e.key === "ArrowRight" && atEnd) {
          e.preventDefault();
          setDebitDropdownOpen(false);
          debitAmountRef.current?.focus();
        }
        // ArrowUp/Down are handled by the input's onKeyDown for dropdown navigation
        // If not at edge, allow normal cursor movement (don't prevent default)
        return;
      }

      // Handle navigation for debit account button
      if (active === debitAccountButtonRef.current) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          debitAmountRef.current?.focus();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          // Move to first credit account dropdown
          if (creditAccountButtonRefs.current[0]) {
            setCreditEntries((prev) =>
              prev.map((row, i) => ({ ...row, open: i === 0 }))
            );
            setTimeout(() => creditSearchRefs.current[0]?.focus(), 0);
          }
        }
        return;
      }

      // Handle navigation for debit amount (only when at edges for number inputs)
      if (active === debitAmountRef.current) {
        const input = active;
        const hasSelection = input.selectionStart !== input.selectionEnd;
        const atStart = input.selectionStart === 0 && !hasSelection;
        const atEnd = input.selectionStart === input.value.length && !hasSelection;

        if (e.key === "ArrowRight" && atEnd) {
          e.preventDefault();
          // Move to first credit account dropdown
          if (creditAccountButtonRefs.current[0]) {
            setCreditEntries((prev) =>
              prev.map((row, i) => ({ ...row, open: i === 0 }))
            );
            setTimeout(() => creditSearchRefs.current[0]?.focus(), 0);
          }
        } else if (e.key === "ArrowDown" && atEnd) {
          e.preventDefault();
          // Move to first credit amount
          if (creditAmountRefs.current[0]) {
            creditAmountRefs.current[0]?.focus();
          }
        } else if (e.key === "ArrowLeft" && atStart) {
          e.preventDefault();
          setDebitDropdownOpen(true);
          setTimeout(() => debitSearchRef.current?.focus(), 0);
        }
        // Allow normal input/selection behavior when not at edges
        return;
      }

      // Handle navigation for credit account dropdown searches (only horizontal arrows at edges)
      creditSearchRefs.current.forEach((searchRef, index) => {
        if (active === searchRef) {
          // Only handle horizontal navigation at edges - ArrowUp/Down handled by input's own handler
          const input = active;
          const atStart = input.selectionStart === 0 && input.selectionEnd === 0;
          const atEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length;

          // Only prevent default and navigate with horizontal arrows if at edge
          if (e.key === "ArrowLeft" && atStart) {
            e.preventDefault();
            // Move to debit amount
            setCreditEntries((prev) =>
              prev.map((row) => ({ ...row, open: false }))
            );
            debitAmountRef.current?.focus();
          } else if (e.key === "ArrowRight" && atEnd) {
            e.preventDefault();
            // Move to credit amount
            setCreditEntries((prev) =>
              prev.map((row, i) => (i === index ? { ...row, open: false } : row))
            );
            if (creditAmountRefs.current[index]) {
              creditAmountRefs.current[index]?.focus();
            }
          }
          // ArrowUp/Down are handled by the input's onKeyDown for dropdown navigation
          // If not at edge, allow normal cursor movement (don't prevent default)
          return;
        }
      });

      // Handle navigation for credit account buttons
      creditAccountButtonRefs.current.forEach((buttonRef, index) => {
        if (active === buttonRef) {
          e.preventDefault();
          if (e.key === "ArrowRight") {
            if (creditAmountRefs.current[index]) {
              creditAmountRefs.current[index]?.focus();
            }
          } else if (e.key === "ArrowDown") {
            // Move to next credit row or credit amount
            if (index < creditAccountButtonRefs.current.length - 1) {
              setCreditEntries((prev) =>
                prev.map((row, i) => ({ ...row, open: i === index + 1 }))
              );
              setTimeout(() => creditSearchRefs.current[index + 1]?.focus(), 0);
            } else if (creditAmountRefs.current[index]) {
              creditAmountRefs.current[index]?.focus();
            }
          } else if (e.key === "ArrowLeft") {
            // Move to debit amount
            if (index === 0) {
              debitAmountRef.current?.focus();
            } else if (creditAmountRefs.current[index - 1]) {
              creditAmountRefs.current[index - 1]?.focus();
            }
          } else if (e.key === "ArrowUp") {
            // Move to debit account or previous credit account
            if (index === 0) {
              setDebitDropdownOpen(true);
              setTimeout(() => debitSearchRef.current?.focus(), 0);
            } else if (creditAccountButtonRefs.current[index - 1]) {
              setCreditEntries((prev) =>
                prev.map((row, i) => ({ ...row, open: i === index - 1 }))
              );
              setTimeout(() => creditSearchRefs.current[index - 1]?.focus(), 0);
            }
          }
        }
      });

      // Handle navigation for credit amounts (only when at edges for number inputs)
      creditAmountRefs.current.forEach((amountRef, index) => {
        if (active === amountRef) {
          // For number inputs, check selection to determine if we're at an edge
          const input = active;
          const hasSelection = input.selectionStart !== input.selectionEnd;
          const atStart = input.selectionStart === 0 && !hasSelection;
          const atEnd = input.selectionStart === input.value.length && !hasSelection;

          // Only navigate with arrows if at edge (or always for navigation between fields)
          // But allow normal selection/editing otherwise
          if (e.key === "ArrowRight") {
            if (atEnd) {
              e.preventDefault();
              // Move to next credit row account or comments
              if (index < creditAccountButtonRefs.current.length - 1) {
                setCreditEntries((prev) =>
                  prev.map((row, i) => ({ ...row, open: i === index + 1 }))
                );
                setTimeout(() => creditSearchRefs.current[index + 1]?.focus(), 0);
              } else {
                commentsRef.current?.focus();
              }
            }
          } else if (e.key === "ArrowLeft") {
            if (atStart) {
              e.preventDefault();
              // Move to credit account dropdown
              setCreditEntries((prev) =>
                prev.map((row, i) => ({ ...row, open: i === index }))
              );
              setTimeout(() => creditSearchRefs.current[index]?.focus(), 0);
            }
          } else if (e.key === "ArrowDown") {
            if (atEnd) {
              e.preventDefault();
              // Move to next credit row amount or comments
              if (index < creditAmountRefs.current.length - 1) {
                creditAmountRefs.current[index + 1]?.focus();
              } else {
                commentsRef.current?.focus();
              }
            }
          } else if (e.key === "ArrowUp") {
            if (atStart) {
              e.preventDefault();
              // Move to previous credit amount or debit amount
              if (index === 0) {
                debitAmountRef.current?.focus();
              } else {
                creditAmountRefs.current[index - 1]?.focus();
              }
            }
          }
        }
      });

      // Handle navigation for comments
      if (active === commentsRef.current) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          // Move to last credit amount
          const lastIndex = creditAmountRefs.current.length - 1;
          if (lastIndex >= 0 && creditAmountRefs.current[lastIndex]) {
            creditAmountRefs.current[lastIndex]?.focus();
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          // Move to last credit amount
          const lastIndex = creditAmountRefs.current.length - 1;
          if (lastIndex >= 0 && creditAmountRefs.current[lastIndex]) {
            creditAmountRefs.current[lastIndex]?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleArrowNavigation);
    return () => window.removeEventListener("keydown", handleArrowNavigation);
  }, [creditEntries]);
  useEffect(() => {
    if (!bulkFile) return;

    const upload = async () => {
      const formData = new FormData();
      formData.append("file", bulkFile);

      try {
        const res = await fetch(
          `${API_BASE_URL}/bulk-upload-journal-entries`,
          { method: "POST", body: formData }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Upload failed");

        // ✅ Success notification
        triggerNotification(data.message, "success");

        // 🔥 HANDLE ROW-LEVEL ERRORS HERE
        if (data.failedRows?.length) {
          triggerNotification(
            `Some rows failed:\n` +
            data.failedRows
              .map(r => `Row ${r.row}: ${r.error}`)
              .join("\n"),
            "warning"
          );
        }

        setBulkFile(null);

      } catch (err) {
        triggerNotification(err.message, "error");
      }
    };

    upload();
  }, [bulkFile]);

  useEffect(() => {
    setTimeout(() => debitDescRef.current?.focus(), 150);
  }, []);


  return (
    <SidebarLayout>
      <JournalNav />

      {/* Main Form Card */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 space-y-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center tracking-tight">
          General Journal Entry
        </h2>
        {/* Entry Date (Temporary for Old Data Entry) */}
        <div className="flex justify-start mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-3 shadow-sm">
            <label className="font-medium text-blue-800 text-sm whitespace-nowrap">
              Entry Date
            </label>

            <input
              ref={dateRef}
              type="text"
              value={entryDate}
              onChange={handleDateChange}
              placeholder="YYYY-MM-DD"
              maxLength={10}
              className="border border-blue-300 rounded-md px-2 py-1 text-sm w-32
                 focus:ring-2 focus:ring-blue-400 transition"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  debitDescRef.current?.focus();
                }
              }}
            />
          </div>
        </div>


        {/* <div className="flex justify-center mt-4">
          <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-4 flex flex-col items-center gap-3 shadow-sm">
            <label className="font-semibold text-green-800">
              Bulk Upload (Excel)
            </label>

            <input
              ref={bulkFileRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setBulkFile(e.target.files[0])}
              className="hidden"
            />


            <button
              onClick={() => {
                if (!bulkFile) {
                  bulkFileRef.current?.click();
                  return;
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              {bulkFile ? "Upload Selected File" : "Select Excel File"}
            </button>


            <button
              onClick={() => setShowGuide(true)}
              className="text-sm text-green-700"
            >
              View Guidelines
            </button>
          </div>
          </div>
          {showGuide && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-3xl rounded-xl p-6 relative">
              <button
                onClick={() => setShowGuide(false)}
                className="absolute top-3 right-3 text-xl"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold mb-4">
                Excel Upload Guidelines
              </h3>

              <div className="space-y-6 text-gray-700">

                <p>
                  Each <b>row</b> in Excel represents <b>one complete journal entry</b>.
                </p>

                <div>
                  <h4 className="font-semibold mb-2">📌 Required Columns</h4>

                  <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-2 py-1">Column Name</th>
                        <th className="border px-2 py-1">Description</th>
                        <th className="border px-2 py-1">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1">entryDate</td>
                        <td className="border px-2 py-1">Journal entry date (YYYY-MM-DD)</td>
                        <td className="border px-2 py-1">2025-01-10</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">description</td>
                        <td className="border px-2 py-1">Narration / description</td>
                        <td className="border px-2 py-1">Office rent payment</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">debitAccount</td>
                        <td className="border px-2 py-1">Exact account name</td>
                        <td className="border px-2 py-1">Rent Expense</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">debitAmount</td>
                        <td className="border px-2 py-1">Debit amount</td>
                        <td className="border px-2 py-1">5000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">📌 Credit Columns (One or More)</h4>

                  <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-2 py-1">Column</th>
                        <th className="border px-2 py-1">Meaning</th>
                        <th className="border px-2 py-1">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-2 py-1">creditAccount1</td>
                        <td className="border px-2 py-1">First credit account</td>
                        <td className="border px-2 py-1">Cash</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">creditAmount1</td>
                        <td className="border px-2 py-1">Amount for creditAccount1</td>
                        <td className="border px-2 py-1">3000</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">creditAccount2</td>
                        <td className="border px-2 py-1">Second credit account (optional)</td>
                        <td className="border px-2 py-1">Bank</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">creditAmount2</td>
                        <td className="border px-2 py-1">Amount for creditAccount2</td>
                        <td className="border px-2 py-1">2000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                  <p className="font-semibold mb-1">⚠ Important Rules</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Debit amount must equal total of all credit amounts</li>
                    <li>Account names must match system accounts exactly</li>
                    <li>One row = one journal entry</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )} */}
        {/* Summary */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 rounded-lg px-6 py-4 text-gray-700 text-sm md:text-base shadow-inner">
          <span>Debit: <b className="text-blue-600">${debitNumeric.toFixed(2)}</b></span>
          <span>Credit: <b className="text-green-600">${totalCredit.toFixed(2)}</b></span>
          <span>
            {balanced ? (
              <span className="text-green-700 font-semibold">Balanced ✓</span>
            ) : (
              <span className="text-red-600 font-semibold">Not balanced</span>
            )}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">


            {/* <div className="md:col-span-1">
              <label className="block font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-full min-h-[100px] border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 transition resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    // Open debit dropdown and focus search
                    setDebitDropdownOpen(true);
                    setTimeout(() => debitSearchRef.current?.focus(), 0);
                  } else if (e.key === "ArrowRight") {
                    e.preventDefault();
                    // Right arrow from description goes to debit account dropdown
                    setDebitDropdownOpen(true);
                    setTimeout(() => debitSearchRef.current?.focus(), 0);
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    // Up arrow from description goes to date
                    dateRef.current?.focus();
                  }
                }}
              />

            </div> */}
            <div className="md:col-span-3 space-y-6">

              {/* Debit Section */}
              <div className="grid md:grid-cols-3 gap-4">

                {/* Debit Line Description */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Line Description
                  </label>

                  <input
                    type="text"
                    value={debitLineDesc}
                    ref={debitDescRef}
                    onChange={(e) => {
                      setDebitLineDesc(e.target.value);
                    }}

                    placeholder="Debit line description"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        setDebitDropdownOpen(true);
                        setTimeout(() => debitSearchRef.current?.focus(), 0);
                      }
                    }}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>

                {/* Debit Account */}
                <div className="relative">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Debit Account *
                  </label>
                  <button
                    ref={debitAccountButtonRef}
                    type="button"
                    className="w-full text-left border border-gray-300 rounded-lg px-4 py-3 bg-white cursor-pointer hover:ring-2 hover:ring-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition flex justify-between items-center"
                    onClick={() => {
                      // close all credit dropdowns
                      setCreditEntries((prev) =>
                        prev.map((row) => ({ ...row, open: false }))
                      );

                      setDebitDropdownOpen((p) => !p);
                      setTimeout(() => debitSearchRef.current?.focus(), 0);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setCreditEntries((prev) =>
                          prev.map((row) => ({ ...row, open: false }))
                        );
                        setDebitDropdownOpen((p) => !p);
                        setTimeout(() => debitSearchRef.current?.focus(), 0);
                      } else if (e.key === "Tab" && !e.shiftKey) {
                        // Allow Tab to move forward
                      } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setDebitDropdownOpen(true);
                        setTimeout(() => debitSearchRef.current?.focus(), 0);
                      }
                    }}
                  >
                    <span>
                      {debitAccount
                        ? accounts.find((a) => a._id === debitAccount)?.accountName || "Select Debit Account"
                        : "Select Debit Account"}
                    </span>
                    <span className="text-gray-400">&#9662;</span>
                  </button>
                  {debitDropdownOpen && (
                    <div ref={debitListRef}
                      className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <input
                        ref={debitSearchRef}
                        type="text"
                        value={debitSearch}
                        onChange={(e) => {
                          setDebitSearch(e.target.value);
                          setDebitActiveIndex(0);
                        }}
                        onKeyDown={(e) => {
                          // Use same filtering and sorting as rendered list
                          const results = filterAccounts(debitSearch)
                            .slice()
                            .sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0));

                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setDebitActiveIndex((i) => Math.min(i + 1, results.length - 1));
                            debitListRef.current?.children[debitActiveIndex + 1]?.scrollIntoView({ block: "nearest" });
                          }

                          if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setDebitActiveIndex((i) => Math.max(i - 1, 0));
                            debitListRef.current?.children[debitActiveIndex + 1]?.scrollIntoView({ block: "nearest" });
                          }

                          if (e.key === "Enter") {
                            e.preventDefault();
                            const acc = results[debitActiveIndex];
                            if (acc) {
                              setDebitAccount(acc._id);
                              setDebitDropdownOpen(false);
                              setDebitSearch("");

                              // Focus debit amount field
                              setTimeout(() => debitAmountRef.current?.focus(), 0);
                            }
                          }

                          // Handle arrow navigation in search
                          if (e.key === "ArrowRight") {
                            // This will be handled by the main navigation handler
                          } else if (e.key === "ArrowDown" && !e.shiftKey) {
                            // Navigate within dropdown list, don't prevent
                          }

                          if (e.key === "Tab") {
                            setDebitDropdownOpen(false);
                            // Allow Tab to move to next field
                          }

                          if (e.key === "Escape") {
                            setDebitDropdownOpen(false);
                          }
                        }}
                        placeholder="Search account..."
                        className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none"
                      />

                      {filterAccounts(debitSearch)
                        .slice()
                        .sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0))
                        .map((acc, i) => (
                          <div
                            key={acc._id}
                            className={`px-4 py-2 text-sm cursor-pointer ${i === debitActiveIndex
                              ? "bg-blue-100"
                              : "hover:bg-blue-50"
                              }`}
                            onClick={() => {
                              setDebitAccount(acc._id);
                              setDebitDropdownOpen(false);
                              setDebitSearch("");
                              debitAmountRef.current?.focus();
                            }}
                          >
                            {acc.starred ? "● " : ""}{acc.accountName} ({acc.accountType})
                          </div>
                        ))}


                    </div>
                  )}
                </div>

                {/* Debit Amount */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Debit Amount *
                  </label>
                  <input
                    ref={debitAmountRef}
                    type="number"
                    min="0"
                    step="0.01"
                    value={debitAmount}
                    onChange={(e) => setDebitAmount(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();

                        // Focus first credit line description
                        const firstDesc =
                          document.querySelectorAll('input[placeholder="Credit line description"]')[0];

                        if (firstDesc) {
                          firstDesc.focus();
                        }
                      }
                    }}

                    placeholder="Enter amount"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
              </div>

              {/* Credit Section */}
              <div>

                {creditEntries.map((entry, index) => (
                  <div key={index} className="grid md:grid-cols-3 gap-4 mb-3">

                    {/* Credit Line Description */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">
                        Line Description
                      </label>

                      <input
                        type="text"
                        value={entry.lineDesc}
                        onChange={(e) =>
                          handleCreditChange(index, "lineDesc", e.target.value)
                        }
                        placeholder="Credit line description"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setCreditEntries((prev) =>
                              prev.map((row, i) =>
                                i === index ? { ...row, open: true } : { ...row, open: false }
                              )
                            );
                            setTimeout(() => creditSearchRefs.current[index]?.focus(), 0);
                          }
                        }}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 transition"
                      />
                    </div>

                    {/* Credit Account Dropdown */}
                    <div className="relative">
                      <label className="block font-semibold text-gray-700 mb-2">
                        Credit Account *
                      </label>

                      <button
                        ref={(el) => (creditAccountButtonRefs.current[index] = el)}
                        type="button"
                        className="w-full text-left border border-gray-300 rounded-lg px-4 py-3 bg-white cursor-pointer
                    hover:ring-2 hover:ring-green-400 focus:ring-2 focus:ring-green-400 focus:outline-none transition flex justify-between items-center"
                        onClick={() => {
                          setDebitDropdownOpen(false);
                          setCreditEntries((prev) =>
                            prev.map((e, i) =>
                              i === index ? { ...e, open: !e.open } : { ...e, open: false }
                            )
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setDebitDropdownOpen(false);
                            setCreditEntries((prev) =>
                              prev.map((row, i) =>
                                i === index ? { ...row, open: true } : { ...row, open: false }
                              )
                            );
                            setTimeout(() => creditSearchRefs.current[index]?.focus(), 0);
                          } else if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setDebitDropdownOpen(false);
                            setCreditEntries((prev) =>
                              prev.map((row, i) =>
                                i === index ? { ...row, open: true } : { ...row, open: false }
                              )
                            );
                            setTimeout(() => creditSearchRefs.current[index]?.focus(), 0);
                          }
                        }}
                      >

                        <span>
                          {entry.account
                            ? accounts.find((a) => a._id === entry.account)?.accountName || "Select Credit Account"
                            : "Select Credit Account"}
                        </span>
                        <span className="text-gray-400">&#9662;</span>
                      </button>
                      {entry.open && (
                        <div ref={(el) => (creditListRefs.current[index] = el)}
                          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          <input
                            ref={(el) => (creditSearchRefs.current[index] = el)}
                            type="text"
                            value={entry.search}
                            onChange={(e) => {
                              handleCreditChange(index, "search", e.target.value);
                              setCreditActiveIndexes((p) => ({ ...p, [index]: 0 }));
                            }}
                            onKeyDown={(e) => {
                              // Use same filtering and sorting as rendered list
                              const results = filterAccounts(entry.search)
                                .slice()
                                .sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0));
                              const active = creditActiveIndexes[index] || 0;

                              if (e.key === "ArrowDown") {
                                e.preventDefault();
                                const next = Math.min(active + 1, results.length - 1);
                                setCreditActiveIndexes((p) => ({ ...p, [index]: next }));
                                creditListRefs.current[index]?.children[next + 1]?.scrollIntoView({ block: "nearest" });
                              }

                              if (e.key === "ArrowUp") {
                                e.preventDefault();
                                const next = Math.max(active - 1, 0);
                                setCreditActiveIndexes((p) => ({ ...p, [index]: next }));
                                creditListRefs.current[index]?.children[next + 1]?.scrollIntoView({ block: "nearest" });
                              }

                              if (e.key === "Enter") {
                                e.preventDefault();
                                const acc = results[active];
                                if (acc) {
                                  handleCreditChange(index, "account", acc._id);
                                  handleCreditChange(index, "search", "");
                                  handleCreditChange(index, "open", false);

                                  // Always focus credit amount after selecting account
                                  setTimeout(() => creditAmountRefs.current[index]?.focus(), 0);
                                }
                              }

                              if (e.key === "Escape") {
                                handleCreditChange(index, "open", false);
                                // Focus back to the credit account button
                                setTimeout(() => creditAccountButtonRefs.current[index]?.focus(), 0);
                              }

                              if (e.key === "Tab") {
                                handleCreditChange(index, "open", false);
                                // Allow Tab to move to next field
                              }
                            }}
                            placeholder="Search account..."
                            className="w-full border-b border-gray-200 px-3 py-2 text-sm focus:outline-none"
                          />

                          {filterAccounts(entry.search)
                            .slice()
                            .sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0))
                            .map((acc, i) => (
                              <div
                                key={acc._id}
                                className={`px-4 py-2 text-sm cursor-pointer ${i === (creditActiveIndexes[index] || 0) ? "bg-blue-100" : "hover:bg-blue-50"}`}
                                onClick={() => {
                                  handleCreditChange(index, "account", acc._id);
                                  handleCreditChange(index, "search", "");
                                  handleCreditChange(index, "open", false);
                                  creditAmountRefs.current[index]?.focus();
                                }}
                              >
                                {acc.starred ? "● " : ""}{acc.accountName} ({acc.accountType})
                              </div>
                            ))}


                        </div>
                      )}
                    </div>

                    {/* Credit Amount */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">
                        Credit Amount *
                      </label>

                      <div className="flex items-center space-x-2">
                        <input
                          ref={(el) => (creditAmountRefs.current[index] = el)}
                          type="number"
                          value={entry.amount}
                          placeholder="Enter amount"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 transition"
                          onChange={(e) => handleCreditChange(index, "amount", e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key !== "Enter") return;
                            e.preventDefault();

                            const row = creditEntries[index];

                            // If account is empty, focus the account dropdown first
                            if (!row.account) {
                              setCreditEntries((prev) =>
                                prev.map((r, i) =>
                                  i === index ? { ...r, open: true } : { ...r, open: false }
                                )
                              );
                              setTimeout(() => creditSearchRefs.current[index]?.focus(), 0);
                              return;
                            }

                            // Account is filled, check balance
                            const debit = Number(parseFloat(String(debitAmount)) || 0);
                            const totalCredit = calcTotalCredit();

                            if (Math.abs(debit - totalCredit) > 0.001) {
                              // Unbalanced → add new row
                              const previousAccount = row.account || debitAccount || "";

                              setCreditEntries((prev) => [
                                ...prev,
                                {
                                  account: previousAccount,
                                  amount: "",
                                  search: "",
                                  open: false,
                                  lineDesc: "",
                                },
                              ]);

                              // 🔹 Focus NEW ROW'S LINE DESCRIPTION (NOT ACCOUNT)
                              setTimeout(() => {
                                const descInputs = document.querySelectorAll(
                                  'input[placeholder="Credit line description"]'
                                );
                                descInputs[index + 1]?.focus();
                              }, 0);
                            }
                            else {
                              // Balanced: move focus to comments
                              commentsRef.current?.focus();
                            }
                          }}
                        />


                        {creditEntries.length > 1 && (
                          <button
                            ref={(el) => (deleteButtonRefs.current[index] = el)}
                            type="button"
                            onClick={() => handleDeleteCreditRow(index)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleDeleteCreditRow(index);
                                // Focus previous credit amount or debit amount if first row
                                if (index > 0) {
                                  setTimeout(() => creditAmountRefs.current[index - 1]?.focus(), 0);
                                } else {
                                  setTimeout(() => debitAmountRef.current?.focus(), 0);
                                }
                              }
                            }}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
                            title="Delete row (Backspace when empty)"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8"> {/* <-- Add margin-top to separate from description */}
            <label className="block font-semibold text-gray-700 mb-2">
              Comments
            </label>
            <textarea
              ref={commentsRef}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-400 transition"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.querySelector("button[type='submit']")?.click();
                }
              }}
            />

          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-12 py-3 rounded-lg font-semibold shadow-lg transition"
            >
              Save Journal Entry
            </button>
          </div>
        </form>
      </div>

      <Notification
        message={notificationMessage}
        type={notificationType}
        onClose={() => setNotificationMessage("")}
      />

    </SidebarLayout>
  );
}
