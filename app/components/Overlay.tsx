import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CompanyDetails {
  name: string;
  lastPull: string;
  created: string;
}

interface OverlayProps {
  companyId: string;
  onClose: () => void;
}

const Overlay = ({ companyId, onClose }: OverlayProps) => {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(
    null
  );
  const router = useRouter();

  // const { overlayOpen } = router.query;

  console.log("hello from overlay");

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(`/company?companyId=${companyId}`);
        if (response.ok) {
          const data = await response.json();
          setCompanyDetails(data);
        } else {
          throw new Error("Failed to fetch company details");
        }
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId]);

  const handleOverlayClose = () => {
    onClose();
    router.back();
  };

  if (!companyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>{companyDetails.name}</h2>
        <p>Last Pull: {companyDetails.lastPull}</p>
        <p>Created: {companyDetails.created}</p>
        {/* recharts for P&L? */}
        <button onClick={handleOverlayClose}>Close</button>
      </div>
    </div>
  );
};

export default Overlay;
