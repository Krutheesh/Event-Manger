"use client";
import {useEffect, useState} from "react";
import api from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";
import useGet from "./useGet";
// Pages that require onboarding (attendee-centered)
const ATTENDEE_PAGES = ["/explore", "/events", "/my-tickets", "/profile"];
export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);

 

  const pathname = usePathname();
  const router = useRouter();
 
  const {data,isLoading,error} = useGet('/users/me');
  

 


  useEffect( () => {
if (isLoading || !data) return;
if (!data.hasCompletedOnboarding) {
      const requiresOnboarding = ATTENDEE_PAGES.some((page) =>
        pathname.startsWith(page)
      );

      if (requiresOnboarding) {
        setShowOnboarding(true);
      }

  }  }, [pathname, isLoading, data]);


const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    router.refresh(); // re-fetch server data
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    router.push("/");
  };


return {
    showOnboarding,
    setShowOnboarding,
    handleOnboardingComplete,
    handleOnboardingSkip,
    needsOnboarding: data && !data.hasCompletedOnboarding,
    isLoading,
    data,
  };


}