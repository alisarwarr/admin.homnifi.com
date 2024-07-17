import GlobalTable from '../../../../components/Table/GlobalTable';
import GlobalModal from '../../../../components/Global/GlobalModal';
import useModalHook from '../../../../utils/hooks/useModalHook';
import SingleMachineModalBody from './SingleMachineModalBody';
import { useCloudActions } from '../../../../store/cloudk/cloudk.action';
import { selectCloudkSlice } from '../../../../store/cloudk/cloudk.slice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const RenderMachinesHistory = () => {
  const stakeModalHook = useModalHook();



  const { getUserMachineList } = useCloudActions();
  const { userMachineList } = useSelector(selectCloudkSlice);
  useEffect(() => {
    getUserMachineList();
  }, []);



  const headCells = [
    {
      id: 'user',
      label: 'User Id',
      dataClass: 'w-72'
    },
    {
      id: 'name',
      label: 'Name',
      dataClass: 'w-72'
    },
    {
      id: 'externalMachineId',
      label: 'External Machine Id',
      dataClass: 'w-72'
    },
    {
      id: 'rewardWallet',
      label: 'Reward Wallet',
      dataClass: 'w-72'
    },
    {
      id: 'stakeToken',
      label: 'Stake Token',
      dataClass: 'w-72'
    },
    {
      id: 'stakeLimit',
      label: 'Stake Limit',
      dataClass: 'w-72'
    },
    {
      id: 'stakeLimit',
      label: 'Stake Limit',
      dataClass: 'w-72'
    },
    {
      id: 'mintingPower',
      label: 'Minting Power',
      dataClass: 'w-72'
    },
    {
      id: 'dlp',
      label: 'DLP',
      dataClass: 'w-72'
    },
    {
      id: 'imageUrl',
      label: 'Image',
      dataClass: 'w-72'
    },
    {
      id: 'createdAt',
      label: 'Time',
      dataClass: 'w-72'
    },
    {
      id: 'boost',
      label: 'Boost',
      dataClass: 'w-72'
    },
    {
      id: 'autoCompound',
      label: 'Auto Compound',
      dataClass: 'w-72'
    },
    {
      id: 'allTimeHigh',
      label: 'All Time High',
      dataClass: 'w-72'
    },
  ];



  const rows = userMachineList?.map((item: any, i: number) => {
    return {
      user: item.user,
      name: item.name,
      externalMachineId: item.externalMachineId,
      rewardWallet: item.rewardWallet,
      stakeToken: item.stakeToken,
      stakeLimit: item.stakeLimit,
      mintingPower: item.mintingPower,
      dlp: item.dlp,
      imageUrl: item.imageUrl,
      createdAt: item.createdAt,
      boost: item.boost,
      autoCompound: item.autoCompound ? "Yes" : "No",
      allTimeHigh: item.allTimeHigh
    }
  });


  return (
    <>
      <GlobalModal
        onClose={() => {
          stakeModalHook.handleClose();
        }}
        isOpen={stakeModalHook.open}
        size="5xl"
      >
        <SingleMachineModalBody id={'1222'} />
      </GlobalModal>

      {
        userMachineList &&
        <GlobalTable
          rows={rows.length ? rows : []}
          headCells={headCells}
          isLoading={false}
          showSort={true}
          tableTitle="Product History"
          // searchIsLoading={false}
          showInnerFilters={true}
          imageItems={['imageUrl']}
          totalPages={Math.ceil(rows.length / 10)}
        />
      }
    </>
  );
};

export default RenderMachinesHistory;
