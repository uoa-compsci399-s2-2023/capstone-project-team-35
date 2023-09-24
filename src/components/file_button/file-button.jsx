// import { useState } from "react";

function FileButton(props) {
  const { image, selected, onClick } = props;
  //   const [isSelected, setIsSelected] = useState(selected);

  return selected ? (
    <div
      className="shadow overflow-clip btn btn-block text-ellipsis whitespace-nowrap btn-secondary btn-black hover:shadow-m"
      onClick={onClick}
    >
      {image.input_image_filename.split("/").pop()}
    </div>
  ) : (
    <div
      className="shadow overflow-clip btn btn-block text-ellipsis whitespace-nowrap btn-outline hover:shadow-m"
      onClick={onClick}
    >
      {image.input_image_filename.split("/").pop()}
    </div>
  );
}

export default FileButton;
