"use client";

import ApplicationCard from "@/components/ApplicationCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleCheckBig, Download, File, Hospital } from "lucide-react";
import Link from "next/link";
import { type ApplicationWithDetails } from "@/components/application/action";
import { ApplicationStatusButtons } from "./status-buttons";

interface ApplicationTabsProps {
  applications: ApplicationWithDetails[];
}

export function ApplicationTabs({ applications }: ApplicationTabsProps) {
  return (
    <Tabs defaultValue="all" className="w-full my-5">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="approved">Approved</TabsTrigger>
        <TabsTrigger value="denied">Denied</TabsTrigger>
      </TabsList>
      
      {["all", "pending", "approved", "denied"].map((tab) => (
        <TabsContent key={tab} value={tab} className="mt-5 w-full">
          {applications
            .filter((application) =>
              tab === "all" || application.status.toLowerCase() === tab
            )
            .map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                userType="manager"
              >
                <div className="flex justify-between gap-5 w-full pb-4 px-4">
                  {/* Colored Section Status */}
                  <div
                    className={`p-4 text-green-700 grow ${
                      application.status === "Approved"
                        ? "bg-green-100"
                        : application.status === "Denied"
                        ? "bg-red-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    <div className="flex flex-wrap items-center">
                      <File className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span className="mr-2">
                        Application submitted on{" "}
                        {new Date(application.applicationDate).toLocaleDateString()}
                        .
                      </span>
                      <CircleCheckBig className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span
                        className={`font-semibold ${
                          application.status === "Approved"
                            ? "text-green-800"
                            : application.status === "Denied"
                            ? "text-red-800"
                            : "text-yellow-800"
                        }`}
                      >
                        {application.status === "Approved" &&
                          "This application has been approved."}
                        {application.status === "Denied" &&
                          "This application has been denied."}
                        {application.status === "Pending" &&
                          "This application is pending review."}
                      </span>
                    </div>
                  </div>

                  {/* Right Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/managers/properties/${application.propertyId}`}
                      className={`bg-white border border-gray-300 text-gray-700 py-2 px-4 
                        rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
                      scroll={false}
                    >
                      <Hospital className="w-5 h-5 mr-2" />
                      Property Details
                    </Link>
                    {application.status === "Approved" && (
                      <button
                        className={`bg-white border border-gray-300 text-gray-700 py-2 px-4
                        rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download Agreement
                      </button>
                    )}
                    <ApplicationStatusButtons 
                      applicationId={application.id}
                      currentStatus={application.status}
                    />
                  </div>
                </div>
              </ApplicationCard>
            ))}
        </TabsContent>
      ))}
    </Tabs>
  );
} 