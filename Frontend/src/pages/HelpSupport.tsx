import Navbar from "../components/dashboard/Navbar";
import Breadcrumb from "../components/Breadcrumb";
//import { ProfileSidebar } from "../components/profile/ProfileSidebar";

import { Upload } from "lucide-react";

export default function HelpSupport() {
  return (
    <div className="bg-neutral-200 min-h-screen">
      <div className="">
        <div className="">
          <main className="">
            <div className="flex gap-6 mt-6">
              <div className="flex-1 max-w-4xl">
                <Breadcrumb
                  items={[
                    { label: "Profile", href: "/profile" },
                    { label: "Help & support" },
                  ]}
                />
                {/* Quick Help Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-2">Quick help</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find answers to fast to common questions
                  </p>

                  <div className="space-y-2">
                    <a
                      href="#"
                      className="text-primary hover:underline text-sm block"
                    >
                      FAQs
                    </a>
                    <a
                      href="#"
                      className="text-primary hover:underline text-sm block"
                    >
                      How saveFi works
                    </a>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Have other questions?
                    </span>
                    <button>Ask SaveBot</button>
                  </div>
                </div>

                {/* Report an Issue Section */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    Report an issue
                  </h2>
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
                        placeholder="e.g: issue with my receipt deposit"
                        className="bg-background"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Category
                      </label>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Leave a message
                      </label>
                      <textarea
                        placeholder="Please describe your issue in detail"
                        className="bg-background min-h-[120px]"
                      />
                    </div>

                    {/* Attachment */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Attachment (optional)
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-background hover:bg-muted/50 transition-colors cursor-pointer">
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
                    </div>

                    {/* Submit Button */}
                    <button className="w-full">Submit report</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
