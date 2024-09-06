import { Link, Head, InertiaLinkProps } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";
import FeLayout from "@/Layouts/FeLayout";
import Text3D from "@/Components/Text3D";

type WelcomeProps = PageProps & {
    prizeGroups: PrizeGroupType[];
};
const Welcome: React.FC<WelcomeProps> = ({ auth, prizeGroups, ...rest }) => {
    console.log(rest);
    return (
        <FeLayout title="Vietjet Luckydraw">
            <div className="w-full h-full">
                <div className="content-head text-center">
                    <Text3D className="uppercase text-6xl font-jambono font-bold mb-6">
                        Sky Career day
                    </Text3D>
                    <Text3D
                        className="uppercase text-5xl font-jambono font-bold"
                        color="yellow"
                    >
                        Lucky draw
                    </Text3D>
                </div>
                <div className="image h-[75vh] flex items-center justify-center">
                    <img
                        src="./images/crews.png"
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="content text-center -mt-[150px]">
                    <div className="prize-navs flex items-center gap-x-6 justify-center">
                        {prizeGroups.map((item) => (
                            <div key={item.id}>
                                <Link
                                    href={route("draw.index", item.id)}
                                    className="text-2xl font-jambono text-red-600 hover:text-red-500 max-w-[320px] block"
                                >
                                    <Text3D
                                        className="uppercase text-5xl font-jambono font-bold mb-6 hover:scale-110 transition-all"
                                        color="yellow"
                                    >
                                        {item.name}
                                    </Text3D>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </FeLayout>
    );
};

export default Welcome;
