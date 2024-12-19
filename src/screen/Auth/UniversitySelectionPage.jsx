import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { editProfile, fetchUniversity } from "../../api/auth";
import { sendToast } from "../../components/utilis";
import useAuthStore from "../../zustand/useAuthStore";

const UniversitySelectionPage = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  // const universities = [
  //   {
  //     id: 1,
  //     name: "Harvard University",
  //     avatar: "/api/placeholder/64/64",
  //     location: "Cambridge, Massachusetts",
  //     students: "31,120"
  //   },
  //   {
  //     id: 2,
  //     name: "Stanford University",
  //     avatar: "/api/placeholder/64/64",
  //     location: "Stanford, California",
  //     students: "17,249"
  //   },
  //   {
  //     id: 3,
  //     name: "Massachusetts Institute of Technology",
  //     avatar: "/api/placeholder/64/64",
  //     location: "Cambridge, Massachusetts",
  //     students: "11,376"
  //   }
  // ];

  const handleContinue = async () => {
    if (selectedUniversity) {
      const body = { university: selectedUniversity }

      const { data, status } = await editProfile(body);

      if (data?.success === true) {
        const { setUser } = useAuthStore.getState();
        setUser(data?.data)

        navigate("/admin/analytics");
      } else {
        sendToast('error', data?.message)
      }
    }
  };

  const handleFetchUniversity = async () => {
    const { data, status } = await fetchUniversity();

    console.log('............', data);

    if (data?.success === true) {
      setUniversities(data?.data)
    } else {
      sendToast('error', data?.message)
    }

  };

  useEffect(() => {
    handleFetchUniversity()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Select Your University
          </h1>
          <p className="text-gray-500">
            Choose the institution you want to manage
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {universities.map((university) => (
            <div
              key={university?._id}
              onClick={() => setSelectedUniversity(university?._id)}
              className={`
                relative cursor-pointer transition-all duration-200
                ${selectedUniversity === university._id
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:bg-gray-50'
                }
                rounded-xl p-4
              `}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={university?.logo}
                      alt={university?.name || 'University Logo'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* University Info */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {university?.name}
                  </h3>
                </div>

                {/* Selection Indicator */}
                <div className="flex-shrink-0">
                  <div
                    className={`
                      w-6 h-6 rounded-full border-2
                      flex items-center justify-center
                      transition-colors duration-200
                      ${selectedUniversity === university._id
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300'
                      }
                    `}
                  >
                    {selectedUniversity === university._id && (
                      <Check className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          className="w-full py-6 text-lg font-medium"
          disabled={!selectedUniversity}
          style={{
            opacity: selectedUniversity ? 1 : 0.5,
            transition: 'all 0.2s ease-in-out'
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UniversitySelectionPage;