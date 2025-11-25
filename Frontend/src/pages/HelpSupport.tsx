import Breadcrumb from "../components/Breadcrumb";
import { Upload, X } from "lucide-react";
import { useState, useRef } from "react";

export default function HelpSupport() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB limit
      setUploadedFile(file);
    } else {
      alert("File size must be less than 10MB");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setUploadedFile(file);
    } else {
      alert("File size must be less than 10MB");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    console.log({ subject, category, message, file: uploadedFile });
    // Handle form submission
  };
  return (
    <div className="bg-neutral-200 dark:bg-gray-600 dark:text-white  min-h-screen">
      <div className="">
        <div className="px-3">
          <div className="flex gap-6">
            <div className="flex-1 max-w-4xl">
              <Breadcrumb
                items={[
                  { label: "Profile", href: "/profile" },
                  { label: "Help & support" },
                ]}
              />
              {/* Quick Help Section */}
              <div className="mb-8 py-6 px-4 bg-neutral-50 dark:bg-gray-700  rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Quick help</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Find answers to fast to common questions
                </p>

                <div className="space-y-2">
                  <a href="#" className="text-blue  text-sm block">
                    FAQs
                  </a>
                  <a href="#" className="text-blue text-sm block">
                    How saveFi works
                  </a>
                </div>

                <div className="mt-4 flex gap-3 items-center justify-end">
                  <span className="text-sm text-muted-foreground">
                    Have other questions?
                  </span>
                  <button className="text-sm border-2 border-blue text-blue font-semibold py-2 px-5 rounded-full hover:bg-blue hover:text-white">
                    Ask SaveBot
                  </button>
                </div>
              </div>

              {/* Report an Issue Section */}
              <div className="bg-neutral-50 dark:bg-gray-700  rounded-lg py-6 px-4">
                <h2 className="text-xl font-semibold mb-2">Report an issue</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Can't find what you are looking for? Let us know
                </p>

                <div className="space-y-6">
                  {/* Subject */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g: issue with my receipt deposit"
                      className="flex  w-full rounded-md bg-neutral-200 dark:bg-gray-600 px-3 py-2.5 text-base  placeholder:text-[#979799] dark:placeholder:text-white/85 focus:outline-none focus:ring-2 focus:ring-blue"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex w-full items-center justify-between rounded-md bg-neutral-200 dark:bg-gray-600 px-3 py-2.5 text-base placeholder:text-[#979799] dark:placeholder:text-white/85 focus:outline-none focus:ring-2 focus:ring-blue "
                    >
                      <option value="">Select a category</option>
                      <option value="deposit">Deposit Issues</option>
                      <option value="withdrawal">Withdrawal Issues</option>
                      <option value="account">Account Issues</option>
                      <option value="technical">Technical Issues</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Leave a message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your issue in detail"
                      className="flex min-h-[120px] w-full rounded-md bg-neutral-200 dark:bg-gray-600 px-3 py-2 text-base placeholder:text-[#979799] dark:placeholder:text-white/85   resize-none focus:outline-none focus:ring-2 focus:ring-blue"
                    />
                  </div>

                  {/* Attachment */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Attachment (optional)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      accept=".png,.jpg,.jpeg,.pdf"
                      className="hidden"
                    />
                    {!uploadedFile ? (
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-neutral-200 dark:bg-gray-600 text-base hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm mb-1">
                          <span className="text-primary font-medium">
                            Upload a file
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, PDF up to 10 MB
                        </p>
                      </div>
                    ) : (
                      <div className="border border-border rounded-lg p-4 bg-background flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                            <Upload className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {uploadedFile.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={removeFile}
                          className="p-2 hover:bg-muted rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="w-[70%] mx-auto">
                    <button
                      onClick={handleSubmit}
                      className="w-full h-11 px-8 rounded-full bg-blue text-white font-semibold hover:bg-blue/90 transition"
                    >
                      Submit report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
