import { X, Download, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

interface TransactionDetailsModalProps {
  amount: number;
  onClose: () => void;
}

const TransactionDetailsModal = ({
  amount,
  onClose,
}: TransactionDetailsModalProps) => {
  const navigate = useNavigate();
  const transactionId = `SAV-${Math.floor(Math.random() * 90000) + 10000}`;
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDownloadReceipt = () => {
    const pdf = new jsPDF();

    // Header
    pdf.setFillColor(37, 99, 235);
    pdf.rect(0, 0, 210, 40, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont("", "bold");
    pdf.text("TRANSACTION RECEIPT", 105, 20, { align: "center" });

    pdf.setFontSize(12);
    pdf.setFont("", "normal");
    pdf.text("Withdrawal Confirmation", 105, 30, { align: "center" });

    // Success badge
    pdf.setFillColor(220, 252, 231);
    pdf.roundedRect(75, 50, 60, 12, 3, 3, "F");
    pdf.setTextColor(22, 163, 74);
    pdf.setFontSize(14);
    pdf.setFont("", "bold");
    pdf.text("✓ SUCCESS", 105, 58, { align: "center" });

    // Amount section
    pdf.setTextColor(31, 41, 55);
    pdf.setFontSize(28);
    pdf.setFont("", "bold");
    pdf.text(`₦${amount.toLocaleString()}`, 105, 80, { align: "center" });

    pdf.setTextColor(107, 114, 128);
    pdf.setFontSize(12);
    pdf.setFont("", "normal");
    pdf.text(`Equivalent: ${(amount / 1450).toFixed(2)} USDT`, 105, 90, {
      align: "center",
    });

    // Divider line
    pdf.setDrawColor(107, 114, 128);
    pdf.setLineWidth(0.5);
    pdf.line(20, 100, 190, 100);

    // Transaction details section
    pdf.setTextColor(31, 41, 55);
    pdf.setFontSize(14);
    pdf.setFont("", "bold");
    pdf.text("Transaction Details", 20, 115);

    pdf.setFontSize(11);
    pdf.setFont("", "normal");

    const details = [
      { label: "Transaction ID:", value: transactionId },
      { label: "Date & Time:", value: date },
      { label: "Payment Method:", value: "Bank Transfer" },
      { label: "Destination:", value: "Bank Account" },
      { label: "Status:", value: "Completed" },
    ];

    let yPos = 130;
    details.forEach((detail) => {
      pdf.setTextColor(107, 114, 128);
      pdf.text(detail.label, 20, yPos);
      pdf.setTextColor(31, 41, 55);
      pdf.text(detail.value, 190, yPos, { align: "right" });
      yPos += 12;
    });

    // Footer
    pdf.setDrawColor(107, 114, 128);
    pdf.line(20, 260, 190, 260);

    pdf.setTextColor(107, 114, 128);
    pdf.setFontSize(10);
    pdf.text("Thank you for using our service!", 105, 270, { align: "center" });
    pdf.text("For support, visit our help center or contact us.", 105, 278, {
      align: "center",
    });

    // Save the PDF
    pdf.save(`receipt-${transactionId}.pdf`);
  };

  const handleReportIssue = () => {
    navigate("/support");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-neutral-50/95 rounded-2xl max-w-md w-full shadow-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h3 className="text-xl font-bold text-foreground">
            Transaction Details
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary cursor-pointer rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Amount Section */}
          <div className="bg-gray-200  rounded-xl p-4 text-center">
            <p className="text-sm mb-2">Withdrawal</p>
            <h2 className="text-4xl font-bold mb-2">
              ₦{amount.toLocaleString()}
            </h2>
            <p className="text-sm mb-3">+{(amount / 1450).toFixed(2)} USDT</p>
            <span className="inline-block px-4 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
              Success
            </span>
          </div>

          {/* Transaction Details */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-4">
              Transaction details:
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">
                  Transaction ID:
                </span>
                <span className="text-sm text-foreground font-medium text-right">
                  {transactionId}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Date:</span>
                <span className="text-sm text-foreground font-medium text-right">
                  {date}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Method:</span>
                <span className="text-sm text-foreground font-medium text-right">
                  Bank transfer
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">
                  Destination:
                </span>
                <span className="text-sm text-foreground font-medium text-right">
                  Bank account
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-3">
            <button
              onClick={handleDownloadReceipt}
              className="w-full py-3 bg-blue hover:bg-blue/80 text-white cursor-pointer font-semibold rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download receipt
            </button>
            <button
              onClick={handleReportIssue}
              className="w-full py-3 border-2 border-blue text-blue hover:bg-accent cursor-pointer font-semibold rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              Report issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
