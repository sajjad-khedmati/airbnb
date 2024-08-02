interface ContainerProps {
	children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
	return (
		<section className="max-w-[2520px] px-4 sm:px-2 lg:px-10 xl:px-20 mx-auto">
			{children}
		</section>
	);
};

export default Container;
