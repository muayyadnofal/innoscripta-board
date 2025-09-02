import {SearchIcon} from "../../icons";
import {SearchInput} from "../../ui/Search/Search";
import {useGetAllIssues} from "../../../domain/useCases/useGetAllIssues";
import {useNavigate} from "react-router-dom";

export const GlobalSearch = () => {
    const {data, isLoading} = useGetAllIssues();
    const navigate = useNavigate();


    return <SearchInput loading={isLoading}
                        onItemSelect={(id) => navigate(`/issue/${id}`)}
                        items={data?.map(item => ({id: item.id, label: item.title, closeOnSelect: true}))}
                        value="" onChange={() => {
    }} name="searh" placeholder="search..." addonAfter={<SearchIcon/>}/>
}