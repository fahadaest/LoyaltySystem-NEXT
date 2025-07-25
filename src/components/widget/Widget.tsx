import Card from "components/card";

const Widget = (props: {
  icon: JSX.Element;
  title: string;
  subtitle: string;
}) => {
  const { icon, title, subtitle } = props;

  return (
    <Card extra="!flex-row flex-grow gap-3 px-2 items-center rounded-[10px]">
      <div className=" flex h-[80px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-2.5 dark:bg-navy-700 flex-shrink-0">
          <span className="flex items-center text-brandGreen dark:text-white">
            {icon}
          </span>
        </div>
      </div>
      <div className="h-50 flex w-auto flex-col justify-center min-w-0 flex-1">
        <p className="font-dm text-xs font-medium text-gray-600">
          {title}
        </p>
        <h4 className="font-bold text-navy-700 dark:text-white text-lg truncate">
          {subtitle}
        </h4>
      </div>
    </Card>
  );
};

export default Widget;