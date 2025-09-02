import classNames from "classnames";
import "./card.css";

interface CardSkeletonProps {
    className?: string;
    headerWidth?: string;
    metaWidth?: string;
    tagsWidth?: string;
    footerWidth?: string;
}

export const CardSkeleton = (props: CardSkeletonProps) => {
    const {className, headerWidth = "60%", metaWidth = "40%", tagsWidth = "50%", footerWidth = "30%"} = props;

    return (
        <div className={classNames("card", "card--skeleton", className)}>
            <div className={classNames("card__header", "skeleton")} style={{width: headerWidth}}/>
            <div className={classNames("card__meta", "skeleton")} style={{width: metaWidth}}/>
            <div className={classNames("card__tags", "skeleton")} style={{width: tagsWidth}}/>
            <div className={classNames("card__footer", "skeleton")} style={{width: footerWidth}}/>
        </div>
    );
};
