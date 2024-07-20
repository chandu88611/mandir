import CampaignForm from "@/components/CampaignForm";
import React from "react";

const EditCampaign = ({ params: { campaignId } }) => {
  return <CampaignForm campaignId={campaignId} />;
};

export default EditCampaign;
