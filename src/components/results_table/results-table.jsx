import React from "react";

const ResultsTable = (props) => {
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
          {/* row 1 */}
          <tr className="text-lg hover">
            <th>1</th>
            <td>species A</td>
            <td>78%</td>
          </tr>
          {/* row 2 */}
          <tr className="text-lg hover">
            <th>2</th>
            <td>species B</td>
            <td>67%</td>
          </tr>
          {/* row 3 */}
          <tr className="text-lg hover">
            <th>3</th>
            <td>species C</td>
            <td>54%</td>
          </tr>
          <tr className="text-lg hover">
            <th>4</th>
            <td>species C</td>
            <td>54%</td>
          </tr>
          <tr className="text-lg hover">
            <th>5</th>
            <td>species C</td>
            <td>54%</td>
          </tr>
          <tr className="text-lg hover">
            <th>6</th>
            <td>species C</td>
            <td>54%</td>
          </tr>
          <tr className="text-lg hover">
            <th>7</th>
            <td>species C</td>
            <td>54%</td>
          </tr>
          <tr className="text-lg hover">
            <th>8</th>
            <td>species C</td>
            <td>54%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
