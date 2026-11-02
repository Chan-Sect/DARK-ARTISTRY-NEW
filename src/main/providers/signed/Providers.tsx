import DataProvider from "./DataProvider.tsx";
import SignedRoutes from "../../containers/SignedRoutes.tsx";
import ContainerProvider from "./ContainerProvider.tsx";
import DirectionProvider from "./DirectionProvider.tsx";

const Providers = () =>
{
    return <DataProvider>
        <ContainerProvider>
            <DirectionProvider>
                <SignedRoutes/>
            </DirectionProvider>
        </ContainerProvider>
    </DataProvider>
}

export default Providers