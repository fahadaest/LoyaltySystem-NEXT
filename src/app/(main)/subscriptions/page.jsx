"use client";
import React, { useState } from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import SubscriptionCard from "@/components/subscriptions/SubscriptionCard";
import Modal from "@/components/ui/Modal";
import ManageSubscriptionComponent from "@/components/subscriptions/ManageSubscriptionComponent";
import NoDataComponent from "@/components/ui/NoDataComponent";
import {
    useGetAllSubscriptionsQuery,
    useCreateSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation,
} from "@/api/subscriptionApis";

const Subscriptions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubscription, setEditingSubscription] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [triggerSubmit, setTriggerSubmit] = useState(false);

    // Fetch subscriptions using RTK Query
    const { data: subscriptions = [], isLoading, error } = useGetAllSubscriptionsQuery();

    const [createSubscription] = useCreateSubscriptionMutation();
    const [updateSubscription] = useUpdateSubscriptionMutation();
    const [deleteSubscription] = useDeleteSubscriptionMutation();

    const handleView = (id) => {
        console.log("View subscription:", id);
    };

    const handleEdit = (id) => {
        const subscription = subscriptions.find((sub) => sub.id === id);
        setEditingSubscription(subscription);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteSubscription(id).unwrap();
            console.log("Subscription deleted:", id);
        } catch (error) {
            console.error("Error deleting subscription:", error);
        }
    };

    const handleAddSubscription = () => {
        setEditingSubscription(null);
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSubscription(null);
        setIsEditMode(false);
        setTriggerSubmit(false);
    };

    const handleSubmitSubscription = async (subscriptionData) => {
        try {
            const apiPayload = {
                name: subscriptionData.subscriptionName.trim(),
                price: parseFloat(subscriptionData.subscriptionPrice).toFixed(2),
                billingCycle: subscriptionData.billingCycle.toLowerCase(),
                status: subscriptionData.status.toLowerCase(),
                startDate: subscriptionData.startDate,
                endDate: subscriptionData.endDate,
                description: subscriptionData.description.trim(),
                features: [
                    "Full access to all features",
                    "Priority customer support",
                    `${subscriptionData.billingCycle} billing convenience`,
                ],
            };

            if (isEditMode && editingSubscription) {
                await updateSubscription({ id: editingSubscription.id, ...apiPayload }).unwrap();
                console.log("Subscription updated:", apiPayload);
            } else {
                await createSubscription(apiPayload).unwrap();
                console.log("New subscription created:", apiPayload);
            }
            closeModal();
        } catch (error) {
            console.error("Error handling subscription:", error);
        }
    };

    const modalFooter = (
        <div className="flex justify-end gap-3">
            <Button
                text="Cancel"
                onClick={closeModal}
                backgroundColor="#F5F5F5"
                textColor="#636363"
                height="40px"
                fontSize="12px"
                padding="0 20px"
                border="1px solid #E2E2E2"
            />
            <Button
                text={isEditMode ? "Update" : "Create"}
                onClick={() => setTriggerSubmit(true)}
                backgroundColor="#000000"
                textColor="#FFFFFF"
                height="40px"
                fontSize="12px"
                padding="0 16px"
                showIcon={true}
                icon="/img/general/plus_white.svg"
                iconPosition="right"
                iconWidth="21px"
                iconHeight="21px"
                iconImageWidth="9px"
                iconImageHeight="9px"
                gap="12px"
            />
        </div>
    );

    if (isLoading) {
        return <div>Loading subscriptions...</div>;
    }

    if (error) {
        return <div>Error loading subscriptions: {error.message}</div>;
    }

    return (
        <main className="w-full h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between flex-shrink-0 mb-8">
                <ComponentHeader
                    title="Manage Subscriptions"
                    subtitle="Manage all your subscriptions"
                    infoMessage="This page allows you to view, edit, and manage all your subscription plans. Use the Add Subscription button to create new subscription tiers."
                />

                <Button
                    text={"Add Subscription"}
                    onClick={handleAddSubscription}
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

            {/* Subscription cards container or NoDataComponent */}
            <div className="flex-1 overflow-auto">
                {subscriptions.length === 0 ? (
                    <NoDataComponent
                        type="subscriptions"
                        onButtonClick={handleAddSubscription}
                    />
                ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                            {subscriptions.map((subscription) => (
                                <SubscriptionCard
                                    key={subscription.id}
                                    planName={subscription.name}
                                    price={`AED ${parseFloat(subscription.price).toFixed(2)}`}
                                    features={subscription.features}
                                    onView={() => handleView(subscription.id)}
                                    onEdit={() => handleEdit(subscription.id)}
                                    onDelete={() => handleDelete(subscription.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={isEditMode ? "Edit Subscription" : "Create Subscription"}
                subtitle={isEditMode ? "Update the subscription information below" : "These subscriptions will be used while adding new admins"}
                maxWidth="40vw"
                footer={modalFooter}
            >
                <ManageSubscriptionComponent
                    onClose={closeModal}
                    onSubmit={handleSubmitSubscription}
                    editingSubscription={editingSubscription}
                    isEditMode={isEditMode}
                    triggerSubmit={triggerSubmit}
                />
            </Modal>
        </main>
    );
};

export default Subscriptions;