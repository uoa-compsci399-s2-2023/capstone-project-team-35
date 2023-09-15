// import { useState } from "react";

function FileButton(props) {
  const { image, selected, onClick } = props;
  //   const [isSelected, setIsSelected] = useState(selected);

  return selected ? (
    <div
      className="overflow-hidden shadow btn btn-block text-ellipsis whitespace-nowrap btn-secondary btn-black hover:shadow-m"
      onClick={onClick}
    >
      {image.input_image_path.split("/").pop()}
    </div>
  ) : (
    <div
      className="overflow-hidden shadow btn btn-block text-ellipsis whitespace-nowrap btn-outline hover:shadow-m"
      onClick={onClick}
    >
      {image.input_image_path.split("/").pop()}
    </div>
  );
}

export default FileButton;
