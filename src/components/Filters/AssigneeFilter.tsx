import {AvatarGroup, AvatarGroupProps} from "../ui/Avatar/AvatarGroup";
import {useObjectSearchParams} from "../../hooks/useObjectSearchParam";
import {useGetAllUsers} from "../../domain/useCases/useGetAllUsers";

interface AssigneeFilterProps extends Omit<AvatarGroupProps, "value" | "onSelectChange" | "avatars"> {
    paramKey?: string;
}

export const AssigneeFilter = (props: AssigneeFilterProps) => {
    const {paramKey = "assignee", ...rest} = props;
    const {getAll, setArrayParam} = useObjectSearchParams();
    const selectedFromUrl = getAll(paramKey);

    const {data: users} = useGetAllUsers();

    return (
        <AvatarGroup size="sm" selectable value={selectedFromUrl}
                     avatars={users?.map((user) => ({
                         id: user.name,
                         label: user.name,
                         src: user.url,
                         alt: user.name,
                     })) ?? []}
                     onSelectChange={(nextSelected) => {
                         setArrayParam(paramKey, nextSelected ?? []);
                     }}
                     {...rest}
        />
    );
};
