import Breadcrumb from "../components/Breadcrumb";

export default function Preferences() {
  return (
    <div className="bg-neutral-200 dark:bg-gray-600 dark:text-white  min-h-screen">
      <div className="">
        <div className="px-3">
          <div className="flex gap-6">
            <div className="flex-1 max-w-4xl space-y-8">
              <Breadcrumb
                items={[
                  { label: "Profile", href: "/profile" },
                  { label: "Settings" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
