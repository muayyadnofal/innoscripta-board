import {useState} from "react";
import {SearchIcon} from "../../icons";
import {SearchInput} from "../../ui/Search/Search";
import {useNavigate} from "react-router-dom";
import {useGetAllIssues} from "../../../domain/useCases/useGetAllIssues";
import {useDebounce} from "../../../hooks/useDebounce";

export const GlobalSearch = () => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const navigate = useNavigate();

    const {data, isLoading} = useGetAllIssues(debouncedSearch);

    return (
        <SearchInput
            loading={isLoading}
            onItemSelect={(id) => navigate(`/issue/${id}`)}
            items={data?.map(item => ({id: item.id, label: item.title, closeOnSelect: true}))}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            placeholder="search..."
            addonAfter={<SearchIcon/>}
        />
    );
};
