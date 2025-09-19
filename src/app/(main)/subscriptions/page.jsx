"use client";
import React, { useState } from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import SubscriptionCard from "@/components/subscriptions/SubscriptionCard";
import Modal from "@/components/ui/Modal";
import ManageSubscriptionComponent from "@/components/subscriptions/ManageSubscriptionComponent";
import NoDataComponent from "@/components/ui/NoDataComponent";
import DeleteConfirmationComponent from "@/components/ui/DeleteConfirmationModal";
import {
    useGetAllSubscriptionsQuery,
    useCreateSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation,
} from "@/store/slices/subscriptionApis";

const Subscriptions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubscription, setEditingSubscription] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [triggerSubmit, setTriggerSubmit] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [deletingSubscription, setDeletingSubscription] = useState(null);

    const { data: subscriptions = [], isLoading, error } = useGetAllSubscriptionsQuery();
    const [createSubscription] = useCreateSubscriptionMutation();
    const [updateSubscription] = useUpdateSubscriptionMutation();
    const [deleteSubscription] = useDeleteSubscriptionMutation();

    const handleEdit = (id) => {
        const subscription = subscriptions.find(sub => sub.id === id);
        setEditingSubscription(subscription);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        const subscription = subscriptions.find(sub => sub.id === id);
        setDeletingSubscription(subscription);
        setIsDeleteMode(true);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteSubscription(deletingSubscription.id).unwrap();
            closeModal();
        } catch (error) {
            alert(`Error deleting subscription: ${error.message || 'Unknown error'}`);
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
        setIsDeleteMode(false);
        setDeletingSubscription(null);
        setTriggerSubmit(false);
    };

    const handleSubmitSubscription = async (subscriptionData) => {
        if (!subscriptionData?.subscriptionName || !subscriptionData?.subscriptionPrice) {
            alert("Please fill required fields");
            return;
        }

        try {
            const apiPayload = {
                name: subscriptionData.subscriptionName.trim(),
                price: subscriptionData.subscriptionPrice.trim(),
                billingCycle: subscriptionData.billingCycle.toLowerCase(),
                status: subscriptionData.status.toLowerCase(),
                description: subscriptionData.description.trim(),
                startDate: subscriptionData.startDate || "",
                endDate: subscriptionData.endDate || ""
            };

            if (isEditMode && editingSubscription) {
                await updateSubscription({ id: editingSubscription.id, ...apiPayload }).unwrap();
            } else {
                await createSubscription(apiPayload).unwrap();
            }
            closeModal();
        } catch (error) {
            alert(`Error ${isEditMode ? 'updating' : 'creating'} subscription`);
        }
    };

    if (isLoading) return <div>Loading subscriptions...</div>;
    if (error) return <div>Error loading subscriptions</div>;

    return (
        <main className="h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between flex-shrink-0">
                <ComponentHeader
                    title="Manage Subscriptions"
                    subtitle="Manage all your subscriptions"
                    infoMessage="This page allows you to view, edit, and manage all your subscription plans."
                />
                <Button
                    text="Add Subscription"
                    onClick={handleAddSubscription}
                    backgroundColor="#000000"
                    textColor="#FFFFFF"
                    icon="/img/general/plus_black.svg"
                    showIcon={true}
                    iconPosition="right"
                    height="2rem"
                    fontSize="0.7rem"
                    padding="0px 4px 0px 12px"
                    iconWidth="1.4rem"
                    iconHeight="1.4rem"
                    iconImageWidth="1rem"
                    iconImageHeight="1rem"
                    gap="12px"
                    borderRadius="2rem"
                />
            </div>

            {/* Cards Grid */}
            <div className="flex-1 min-h-0 overflow-auto">
                {subscriptions.length === 0 ? (
                    <NoDataComponent type="subscriptions" onButtonClick={handleAddSubscription} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
                        {subscriptions.map(subscription => (
                            <SubscriptionCard
                                key={subscription.id}
                                planName={subscription.name}
                                price={`AED ${parseFloat(subscription.price).toFixed(2)}`}
                                features={[
                                    `${subscription.billingCycle} billing convenience`,
                                    subscription.description || "Premium subscription plan"
                                ]}
                                onView={() => console.log("View:", subscription.id)}
                                onEdit={() => handleEdit(subscription.id)}
                                onDelete={() => handleDelete(subscription.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={isDeleteMode ? "Delete Subscription" : (isEditMode ? "Edit Subscription" : "Create Subscription")}
                subtitle={isDeleteMode ? "Confirm subscription deletion" : (isEditMode ? "Update subscription information" : "Create new subscription")}
                maxWidth={isDeleteMode ? "25vw" : "40vw"}
                hideHeader={isDeleteMode} // Hide header for delete confirmation
                footer={!isDeleteMode ? (
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
                            onClick={() => {
                                setTriggerSubmit(true);
                                setTimeout(() => setTriggerSubmit(false), 100);
                            }}
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
                ) : null}
            >
                {isDeleteMode ? (
                    <DeleteConfirmationComponent
                        onConfirm={confirmDelete}
                        onCancel={closeModal}
                        itemName={deletingSubscription?.name}
                    />
                ) : (
                    <ManageSubscriptionComponent
                        onSubmit={handleSubmitSubscription}
                        editingSubscription={editingSubscription}
                        isEditMode={isEditMode}
                        triggerSubmit={triggerSubmit}
                    />
                )}
            </Modal>
        </main>
    );
};

export default Subscriptions;