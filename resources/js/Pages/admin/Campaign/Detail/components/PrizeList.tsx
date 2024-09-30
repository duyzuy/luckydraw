import TableData from "@/Components/TableData";
import { PrizeGroupType } from "@/models/prizeGroup";
import { columns } from "@/Pages/admin/PrizeGroups/column";
type PrizeListProps = {
    items: PrizeGroupType[];
};
const PrizeList: React.FC<PrizeListProps> = ({ items }) => {
    console.log(items);
    return <>{/* <TableData dataSource={items} columns={columns} /> */}</>;
};
export default PrizeList;
