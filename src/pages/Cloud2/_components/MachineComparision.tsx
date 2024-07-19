import React, { useEffect, useRef, useState } from 'react';
import GlobalSubheading from '../../../components/Global/GlobalSubheading';
import CardSlider from '../../../components/Slider/CardSlider';
import CardLayout from '../../../components/Cards/CardLayout.tsx';
import { MachineImage } from '../../../images/cloud';
import { SwiperSlide } from 'swiper/react';
import CardSelect from '../../../components/Cards/CardSelect';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  clouldk2SliceAction,
  Clouldk2State,
  selectClouldSlice,
} from '../../../store/clouldk2Slice';
import GlobalButton from '../../../components/Global/GlobalButton';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

type Props = {};

export type TCloud2CardData = {
  id: string;
  name: string;
  bestSeller: boolean;
  image: string;
  rewards: number;
  value: number;
};

const MachineComparision = (props: Props) => {
  const { activeMachines, machineList } = useSelector(selectClouldSlice);

  const parentRef = useRef(null);
  const navigate = useNavigate();
  const [isScrolledOut, setIsScrolledOut] = useState(false);

  const dispatch = useDispatch();

  const updateValue = (value: any) =>
    dispatch(
      clouldk2SliceAction.setClouldk2Slice({
        ...value,
      })
    );

  const handleClose = (data: any) => {
    const findItem = activeMachines.find((item: any) => item.id === data?.id);

    if (findItem) {
      let allItems = activeMachines;
      allItems = allItems.filter((item: any) => item.id !== findItem.id);
      updateValue({ activeMachines: allItems });
      return;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolledOut(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (parentRef.current) {
      observer.observe(parentRef.current);
    }

    return () => {
      if (parentRef.current) {
        observer.unobserve(parentRef.current);
      }
    };
  }, []);

  const isDesktopView = useMediaQuery({
    query: '(min-width: 1440px)',
  });

  const isTabletView = useMediaQuery({
    query: '(min-width: 768px)',
  });

  const slidesPerView = isDesktopView ? 5 : isTabletView ? 3 : 1;

  const totalActiveMachines = activeMachines.length;
  const availableSelection = machineList.length - 1 - activeMachines.length;

  const message = !availableSelection
    ? 'Remove one machine to add other machine'
    : totalActiveMachines && totalActiveMachines < 4
      ? `You've selected ${totalActiveMachines}, now you can select ${availableSelection} more machines.`
      : 'Please select more than one machine to compare!';

  return (
    <>
      <section className="col-span-2 flex flex-col gap-5" ref={parentRef}>
        <article>
          <GlobalSubheading text="Machine Comparison" />
          <span
            className={`text-xs font-normal ${!totalActiveMachines ? 'text-redDanger' : 'text-cardSecondaryText '}`}
          >
            {message}
          </span>
        </article>

        <CardLayout className="col-span-2 p-5">
          <CardSlider
            className="w-full"
            data={machineList}
            slidesPerView={slidesPerView}
            spaceBetween={10}
          >
            {machineList.map((card, index) => (
              <SwiperSlide key={index}>
                <CardSelect
                  data={card}
                  containerStyles="!self-center flex justify-center items-center"
                />
              </SwiperSlide>
            ))}
          </CardSlider>
        </CardLayout>
      </section>

      <div className="w-full col-span-2 bg-white/40 backdrop-blur-md overflow-x-auto">
        <GlobalSubheading text="Machines" />

        <div className="flex gap-2 w-full min-w-[1400px]">
          <table className="w-full table-fixed">
            <tr>
              <td></td>
              {activeMachines.map((card, index) => (
                <td>
                  <CardSelect
                    key={index}
                    data={card}
                    containerStyles="!self-center flex justify-center items-center"
                    removeItem={true}
                    backgroundClassName={'bg-white border border-borderBlue'}
                    addItem={false}
                    ActionButton={
                      <GlobalButton
                        text="BUY NOW"
                        classNames="!text-xs !py-2 !w-24 !font-normal"
                        onClick={() => navigate('/defi-360/cloudk2/purchase')}
                      />
                    }
                  />
                </td>
              ))}
            </tr>
          </table>
        </div>
      </div>

      {isScrolledOut ? (
        <div
          className={`flex gap-5 translate-y-0 col-span-2 items-center bg-white/30 backdrop-blur-md sticky top-[85px]`}
        >
          {activeMachines.map((machine, index) => (
            <div
              key={index}
              className="min-w-[80px] px-5 py-2 rounded-lg border relative"
            >
              {machine.name}

              <button
                className="absolute top-0 -right-1 text-primary rounded-md w-5 h-5"
                onClick={() => handleClose(machine)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default MachineComparision;
