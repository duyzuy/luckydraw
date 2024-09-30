import { Link, Head, InertiaLinkProps } from "@inertiajs/react";
import { PageProps } from "@/types";
import { PrizeGroupType } from "@/models/prizeGroup";
import FeLayout from "@/Layouts/FeLayout";
import Text3D from "@/Components/Text3D";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { CampaignType } from "@/models/campaign";

type WelcomeProps = PageProps & {
    campaigns: CampaignType[];
};
const Welcome: React.FC<WelcomeProps> = ({
    auth,
    campaigns,
    flash,
    // share: { campaigns },
}) => {
    console.log(campaigns);
    return (
        <FeLayout title="Vietjet Luckydraw">
            <div className="w-full h-[100vh] flex py-12 items-center">
                <div className="col-image w-7/12 py-8">
                    <div
                        className="thumbnail flex items-center justify-center"
                        style={{ height: "calc(100vh - 96px)" }}
                    >
                        <img
                            src="/images/lucky-kv.png"
                            className="max-w-full max-h-full leading-none"
                        />
                    </div>
                </div>
                <div className="col-content w-5/12">
                    <div
                        className="block rounded-lg"
                        style={{ height: "calc(100% - 200px)" }}
                    >
                        <Text3D
                            className="uppercase text-6xl font-jambono font-bold mb-12 mx-auto text-center"
                            color="yellow"
                        >
                            Lucky draw
                        </Text3D>
                        <div className="box-campaign h-full">
                            <div className="bg-white h-full relative rounded-[40px] px-8 pb-8">
                                <div className="absolute top-0 left-0 z-20 pointer-events-none">
                                    <img
                                        src="/images/crew-chibi.png"
                                        alt="Chibi"
                                        width={150}
                                        height={150}
                                    />
                                </div>
                                <div className="box-campaign__content z-10 relative h-full">
                                    <div className="box-campaign__content-head bg-red-600 rounded-b-full w-fit px-12 pb-6 pt-4 mx-auto mb-12">
                                        <h3
                                            className="uppercase font-jambono text-white text-5xl font-bold drop-shadow-md"
                                            style={{
                                                WebkitTextStrokeWidth: "2px",
                                                WebkitTextFillColor: "#ffde02",
                                                WebkitTextStrokeColor:
                                                    "#875017",
                                            }}
                                        >
                                            Campaigns
                                        </h3>
                                    </div>
                                    <div className="overflow-y-auto max-h-[500px] pt-6 px-3">
                                        <div className="box-campaign__content-list">
                                            {campaigns.map((item, _index) => (
                                                <div
                                                    key={item.id}
                                                    className="border-b pb-6 mb-6"
                                                >
                                                    <Link
                                                        href={route(
                                                            "home.campaign",
                                                            item.id
                                                        )}
                                                        className="font-jambono text-yellow-300 hover:text-yellow-500  uppercase text-3xl font-bold flex"
                                                        style={{
                                                            WebkitTextStrokeWidth:
                                                                "2px",
                                                            WebkitTextStrokeColor:
                                                                "#875017",
                                                        }}
                                                    >
                                                        <span className="w-12 block">
                                                            {`${_index + 1}.`}
                                                        </span>
                                                        <span className="text">
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FeLayout>
    );
};

export default Welcome;
