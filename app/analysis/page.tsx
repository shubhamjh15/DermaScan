"use server";

import React from 'react'
import AnalysisPage from '@/components/pages/skinanalysis';
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {auth} from "@/lib/auth";

const skinpage = async () => {
  const session=await auth.api.getSession({headers: await headers()});
    if(!session){
        redirect("/login");
    }
  return (
    <div><AnalysisPage /></div>
  )
}

export default skinpage