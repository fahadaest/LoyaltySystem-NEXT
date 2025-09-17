"use client";
import React, { useState } from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";

const Subscriptions = () => {


    return (
        <main className="w-full h-full flex flex-col overflow-hidden">
            <div className=" flex items-start justify-between flex-shrink-0 ">
                <ComponentHeader
                    title="Admin List"
                    subtitle="Manage admins here"
                    infoMessage="This page allows you to add, edit, and manage all your admins. Use the Add Admin button to create new admin accounts."
                />

                <Button
                    text={"Add Admin"}
                    onClick={() => console.log("Add Admin clicked")}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/plus_white.svg"}
                    showIcon={true}
                    iconPosition={'right'}
                    disabled={false}
                    height={'2rem'}
                    fontSize={'0.7rem'}
                    padding={'0px 4px 0px 12px'}
                    iconWidth={'1.4rem'}
                    iconHeight={'1.4rem'}
                    iconImageWidth={'1rem'}
                    iconImageHeight={'1rem'}
                    gap={'12px'}
                    borderRadius={'2rem'}
                />
            </div>

        </main>
    );
};

export default Subscriptions;