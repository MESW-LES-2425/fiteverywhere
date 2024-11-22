import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth.ts";

const GymProfile: React.FC = () => {
  const { user } = useAuth();
  const { username, email, role } = user || {};
  const [isEditing, setIsEditing] = useState(false);
  const [gymName, setGymName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [facilities, setFacilities] = useState<string | null>("");
  const [dailyFee, setDailyFee] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await fetch(`/api/gym/details`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch gym details");
        }
        const data = await response.json();
        setGymName(data.gymName);
        setLocation(data.location);
        setFacilities(data.facilities);
        setDailyFee(data.dailyFee);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      } catch (error) {
        console.error("Error fetching gym details:", error);
      }
    };

    fetchGymDetails();
  }, []);

  const handleSaveGymDetails = async () => {
    try {
      const response = await fetch("/api/gym/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gymName,
          location,
          facilities,
          dailyFee,
          latitude,
          longitude,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Failed to save gym details:",
          errorData.message || response.statusText,
        );
        alert("Failed to save gym details");
        return;
      }

      const data = await response.json();
      alert(data.message);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving gym details:", error);
      alert("Error saving gym details");
    }
  };

  return (
    <div className="flex justify-center items-center w-max">
      <div className="bg-background rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <FiUser className="w-20 h-20" />
        </div>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          {username ? `Welcome, ${username}!` : "Welcome!"}
        </h2>
        <div className="text-left space-y-3">
          <div>
            <span className="font-bold">Username:</span> {username || "N/A"}
          </div>
          <div>
            <span className="font-bold">Email:</span> {email || "N/A"}
          </div>
          <div>
            <span className="font-bold">Role:</span> {role || "N/A"}
          </div>
        </div>
        <hr className="my-4" />
        {!isEditing ? (
          <div>
            <div>
              <span className="font-bold">Gym Name:</span>{" "}
              {gymName || "Not set"}
            </div>
            <div>
              <span className="font-bold">Location:</span>{" "}
              {location || "Not set"}
            </div>
            <div>
              <span className="font-bold">Facilities:</span>{" "}
              {facilities || "Not set"}
            </div>
            <div>
              <span className="font-bold">Daily Fee:</span>{" "}
              {dailyFee || "Not set"}
            </div>
            <div>
              <span className="font-bold">Latitude:</span>{" "}
              {latitude || "Not set"}
            </div>
            <div>
              <span className="font-bold">Longitude:</span>{" "}
              {longitude || "Not set"}
            </div>
            <button
              className="bg-primary text-white py-2 px-4 rounded mt-4"
              onClick={() => setIsEditing(true)}
            >
              Edit Details
            </button>
          </div>
        ) : (
          <div>
            <div>
              <label className="font-bold">Gym Name:</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-bold">Location:</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="font-bold">Facilities:</label>
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={facilities || ""}
                onChange={(e) => setFacilities(e.target.value)}
              />
            </div>
            <div>
              <label className="font-bold">Daily Fee:</label>
              <input
                type="number"
                className="border p-2 rounded w-full"
                value={dailyFee || ""}
                onChange={(e) => setDailyFee(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="font-bold">Latitude:</label>
              <input
                type="number"
                className="border p-2 rounded w-full"
                value={latitude || ""}
                onChange={(e) => setLatitude(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="font-bold">Longitude:</label>
              <input
                type="number"
                className="border p-2 rounded w-full"
                value={longitude || ""}
                onChange={(e) => setLongitude(Number(e.target.value))}
              />
            </div>
            <button
              className="bg-primary text-white py-2 px-4 rounded mt-4"
              onClick={handleSaveGymDetails}
            >
              Save Details
            </button>
            <button
              className="bg-secondary text-white py-2 px-4 rounded mt-4 ml-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GymProfile;
