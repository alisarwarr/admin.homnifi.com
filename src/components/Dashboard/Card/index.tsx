type Props = { title: string; Content: any };

const Card = ({ title, Content }: Props) => {
  return (
    <div className="rounded-md py-4 text-black">
      {/* TITLE */}
      <p className="text-md font-semibold">{title}</p>

      {/* STATS */}
      {/* <div className="grid grid-cols-1 gap-2 mt-2"> */}
      <Content />
      {/* </div> */}
    </div>
  );
};

export default Card;
