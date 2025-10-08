"use server";

import React from 'react'
import BeautyAnalysisPage from '@/components/pages/beautyanalysis';
import {auth} from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const beautyPage = async () => {
  const session=await auth.api.getSession({headers: await headers()});
    if(!session){
        redirect("/login");
    }
  return (
    <div>
      <BeautyAnalysisPage />
    </div>
  )
}

export default beautyPage