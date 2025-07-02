import ApplicationCard from "@/components/ApplicationCard";
import Header from "@/components/Header";
import { getManagerApplications, type ApplicationWithDetails } from "@/components/application/action";
import { ApplicationTabs } from "../../../../components/application/tabs";

const Applications = async () => {
  const result = await getManagerApplications();

  if (!result.success) {
    return (
      <div className="dashboard-container">
        <Header
          title="Applications"
          subtitle="View and manage applications for your properties"
        />
        <div className="mt-8 p-4 bg-red-100 border border-red-300 rounded-md">
          <p className="text-red-800">
            {result.error || "Failed to load applications"}
          </p>
        </div>
      </div>
    );
  }

  const applications = result.data || [];

  return (
    <div className="dashboard-container">
      <Header
        title="Applications"
        subtitle="View and manage applications for your properties"
      />
      <ApplicationTabs applications={applications} />
    </div>
  );
};

export default Applications;
