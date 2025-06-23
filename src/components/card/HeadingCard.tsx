import Card from "components/card";

const HeadingCard = (props: {
    icon?: JSX.Element;
    title?: string;
    subtitle: string;
    children?: React.ReactNode;
}) => {
    const { icon, title, subtitle, children } = props;

    return (
        <Card extra="!flex-row flex-grow items-center justify-between rounded-xl px-3 py-2 xs:px-4 xs:py-4 sm:px-8 sm:py-6">
            <div className="flex items-center gap-4">
                {icon && <div className="text-2xl">{icon}</div>}
                <h4 className="text-[12px] xs:text-lg sm:text-2xl font-bold text-navy-700 dark:text-white">
                    {subtitle}
                </h4>
            </div>

            {children && <div className="flex items-center">{children}</div>}
        </Card>
    );
};

export default HeadingCard;
