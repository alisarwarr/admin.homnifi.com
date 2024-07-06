type Props = { title: string; Content: any };

const Card = ({ title, Content }: Props) => {
  return (
    <div className="rounded-md gradient-bg px-4 py-4 text-white bg-[#181717]">
      {/* TITLE */}
      <p className="text-2xl font-semibold">{title}</p>

      {/* STATS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 mt-2">
        <Content />
      </div>
    </div>
  );
};

export default Card;
