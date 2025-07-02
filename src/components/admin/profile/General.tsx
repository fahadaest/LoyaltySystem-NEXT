import Card from "components/card";
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import { useGetSubscriptionByIdQuery } from "store/subscriptionApi";

const General = ({ data }) => {
  console.log("data", data);
  const subId = data?.subscriptionId;
  const { data: subscriptionsData, error, isLoading } = useGetSubscriptionByIdQuery(subId);

  return (
    <Card extra={"w-full h-full p-3"}>
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          More Information
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          Following is the Admin's subscription permissions information
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 px-2">

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Subscription Information</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Admin User Not Allowed Currently
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Loyalties Allowed</p>

          <div className="flex items-center mt-2">
            <p className="text-sm text-gray-600">Product Based Loyalty:</p>
            {data?.productBasedLoyalty ? (
              <MdCheckCircle className="h-5 w-5 text-green-500 ml-2" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500 ml-2" />
            )}
          </div>

          <div className="flex items-center mt-2">
            <p className="text-sm text-gray-600">Point Based Loyalty:</p>
            {data?.pointBasedLoyalty ? (
              <MdCheckCircle className="h-5 w-5 text-green-500 ml-2" />
            ) : (
              <MdCancel className="h-5 w-5 text-red-500 ml-2" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default General;
