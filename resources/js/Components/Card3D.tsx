import styled from "styled-components";
import Title from "./Title";

interface Card3DProps {
    title?: string;
    render?: React.ReactNode;
}
const Card3D: React.FC<Card3DProps> = ({ title, render }) => {
    return (
        <StyledCard className="card">
            <div className="card-inner">
                <div className="card-header flex items-center bg-[#f60806] rounded-xl py-1 mb-6 relative">
                    <div className="flex-1">
                        <h4 className="text-white font-jambono text-center text-4xl py-3">
                            {title}
                        </h4>
                    </div>
                </div>
                <div className="card-body overflow-y-auto max-h-[75vh] relative">
                    {render}
                </div>
            </div>
        </StyledCard>
    );
};
export default Card3D;

const StyledCard = styled.div`
    & {
        border-radius: 18px;
        background: white;
        padding: 16px;

        box-shadow: 6px 6px 0 0 rgb(255, 255, 255, 0.8),
            12px 12px 0 0 rgb(255, 255, 255, 0.4),
            20px 20px 0 0 rgb(255, 255, 255, 0.2),
            28px 28px 0 0 rgb(255, 255, 255, 0.2);
        .card-inner {
            // transform: rotateY(30deg);
        }
        .card-header {
        }
        .card-body {
        }
    }
`;
