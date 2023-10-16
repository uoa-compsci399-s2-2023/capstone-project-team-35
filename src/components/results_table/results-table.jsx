import React from "react";

const ResultsTable = (props) => {
  const { image } = props;

  if (!image) return null;
  const { predictions } = image;

  return (
    <div className="flex w-full h-full max-h-full overflow-auto">
      <table className="table">
        {/* head */}
        <thead className="text-xl">
          <tr
            className="sticky top-0 bg-white border-b-2 border-gray-200"
            style={{
              fontSize: "1.1vw",
              fontFamily: "Geologica",
              color: "#707070",
            }}
          >
            <th></th>
            <th>genus-species</th>
            <th>probability</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(predictions).map(([rank, prediction]) => (
            <tr style={{ fontSize: "0.9vw" }} className="text-lg hover">
              <th>{`${Number(rank) + 1}`}</th>
              <td>
                {prediction.genus} {prediction.species}
              </td>
              <td>{`${(Number(prediction.probability) * 100).toFixed(2)}%`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
