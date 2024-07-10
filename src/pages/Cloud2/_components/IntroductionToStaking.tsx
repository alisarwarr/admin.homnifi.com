import CardLayout from '../../../components/Cards/CardLayout.tsx';

import './cloud.css';
import { CalculatorIcon, FileIcon } from '../../../images/svgs';
import GlobalSimpleButton from '../../../components/Global/GlobalSimpleButton';

type Props = {};

const IntroductionToStaking = (props: Props) => {
  return (
    <CardLayout className="md:col-span-1 col-span-2 p-5 flex flex-col gap-3">
      <article className="flex items-center gap-3">
        <h1 className="text-secondaryBlack font-medium text-lg">
          Introduction to Staking
        </h1>

        <GlobalSimpleButton
          text="How it works"
          classNames="bg-secondaryLightBlue rounded-md w-max px-4 !py-0 !text-primary !text-sm"
          StartIcon={<FileIcon className="w-4 h-4" />}
        />
      </article>
      <span className="text-cardSecondaryText text-sm font-normal">
        Lorem ipsum dolor sit amet consectetur. Cras egestas et placerat aliquet
        id tristique. Ac cursus varius vitae dictumst lacus eu vel sed. Blandit
        nunc vel nunc tincidunt amet lacus. Magna pellentesque lacus sit enim
        lacus adipiscing ac.Lorem ipsum dolor sit amet consectetur. Cras egestas
        et placerat aliquet id tristique.
      </span>

      <GlobalSimpleButton
        text="REWARDS CALCULATOR"
        classNames="rounded-md w-max px-5 text-white !font-normal !text-sm !bg-buttonBlueGradient"
        StartIcon={<CalculatorIcon className="w-4 h-4 text-white" />}
      />
    </CardLayout>
  );
};

export default IntroductionToStaking;
