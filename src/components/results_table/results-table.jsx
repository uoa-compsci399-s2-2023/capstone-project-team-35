import React from "react";

const ResultsTable = (props) => {
  const { image } = props;

  console.log("ResultsTable image:");
  console.log(image);

  if (!image) return null;
  const { predictions } = image;

  return (
    <div className="flex w-full h-full max-h-full overflow-auto">
      <table className="table">
        {/* head */}
        <thead className="text-xl">
          <tr>
            <th></th>
            <th>Species Name</th>
            <th>Probability</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(predictions).map(([rank, prediction]) => (
            <tr className="text-lg hover">
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
