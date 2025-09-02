import {SeverityDot} from "../../../ui/SeverityDot/SeverityDot";
import "./card.css"

interface CardMetaProps {
    severity: number;
    createdAt: string;
}

export const CardMeta = (props: CardMetaProps) => {
    const {severity, createdAt} = props;

    return (
        <div className="card__meta">
            <div className="severity">
                <SeverityDot level={severity}/>
                Severity: {severity}
            </div>
            <div className="created">{new Date(createdAt).toLocaleDateString()}</div>
        </div>
    );
}