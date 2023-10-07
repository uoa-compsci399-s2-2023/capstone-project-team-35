function FileButton(props) {
  const { image, selected, onClick } = props;

  return selected ? (
    <div
      className="p-2 text-left shadow btn text-ellipsis btn-block whitespace-nowrap btn-secondary hover:shadow-m"
      onClick={onClick}
    >
      <span
        className="w-full truncate"
        style={{
          fontFamily: "Geologica",
          fontWeight: 500,
          letterSpacing: 0,
        }}
      >
        {image.input_image_filename}
      </span>
    </div>
  ) : (
    <div
      className="flex flex-row items-center justify-start p-2 text-left shadow btn btn-block whitespace-nowrap hover:shadow-m"
      onClick={onClick}
    >
      <span
        className="w-full truncate"
        style={{
          fontFamily: "Geologica",
          fontWeight: 400,
          letterSpacing: 0,
        }}
      >
        {image.input_image_filename}
      </span>
    </div>
  );
}

export default FileButton;
