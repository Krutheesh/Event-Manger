"use client";

import { useState, useMemo } from "react";
import { MapPin, Heart, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { State, City } from "country-state-city";
import api from "@/lib/api";
import { CATEGORIES } from "@/lib/data";

export default function Onboarding({ isOpen, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [location, setLocation] = useState({
    state: "",
    city: "",
    country: "India",
  });

  // Indian states
  const indianStates = useMemo(
    () => State.getStatesOfCountry("IN"),
    []
  );

  // Cities based on state
  const cities = useMemo(() => {
    if (!location.state) return [];
    const state = indianStates.find((s) => s.name === location.state);
    return state ? City.getCitiesOfState("IN", state.isoCode) : [];
  }, [location.state, indianStates]);

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedInterests.length < 3) {
      toast.error("Select at least 3 interests");
      return;
    }

    if (step === 2 && (!location.state || !location.city)) {
      toast.error("Select state and city");
      return;
    }

    step === 2 ? handleComplete() : setStep(step + 1);
  };

  const handleComplete = async () => {
    try {
      setIsLoading(true);

      await api.post("/users/onboarding", {
        interests: selectedInterests,
        location,
      });

      toast.success("Welcome 🎉");
      onComplete();
    } catch (err) {
      toast.error("Failed to complete onboarding");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-xl bg-black p-6 shadow-lg">
        {/* Progress */}
        <div className="mb-4 h-1 w-full rounded bg-gray-200">
          <div
            className="h-1 rounded bg-purple-500 transition-all"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            {step === 1 ? (
              <>
                <Heart className="text-purple-500" />
                What interests you?
              </>
            ) : (
              <>
                <MapPin className="text-purple-500" />
                Where are you located?
              </>
            )}
          </h2>
          <p className="mt-1 text-gray-500">
            {step === 1
              ? "Pick at least 3 categories"
              : "We’ll show nearby events"}
          </p>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="grid max-h-[400px] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 ">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => toggleInterest(cat.id)}
                className={`rounded-lg border-2 p-4 text-center transition ${
                  selectedInterests.includes(cat.id)
                    ? "border-purple-500 bg-black-50"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                <div className="text-2xl">{cat.icon}</div>
                <div className="mt-2 text-sm font-medium">{cat.label}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="grid grid-cols-2 gap-4">
            <select
              className="h-11 rounded border px-3 bg-black"
              value={location.state}
              onChange={(e) =>
                setLocation({ ...location, state: e.target.value, city: "" })
              }
            >
              <option value="">Select State</option>
              {indianStates.map((s) => (
                <option key={s.isoCode} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              className="h-11 rounded border px-3 bg-black"
              value={location.city}
              disabled={!location.state}
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 rounded border px-4 py-2"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={isLoading}
            className="ml-auto flex items-center gap-2 rounded bg-purple-500 px-6 py-2 text-white hover:bg-purple-600 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : step === 2 ? "Finish" : "Continue"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
