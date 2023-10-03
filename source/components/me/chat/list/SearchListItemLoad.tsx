type Props = {
	lastItem: boolean
}
const SearchListItemLoad = ({ lastItem }: Props) => {

	return (
		<div className="flex gap-4 items-center pb-3">
			<div className="">
				<div className="w-12 h-12 rounded-full skeleton" />
			</div>
			<div className="flex-1 flex flex-col justify-center items-start gap-2">
				<h4 className="text-base font-medium skeleton text-transparent w-[55%] h-5 rounded-xl"></h4>
				<p className="text-sm font-light skeleton text-transparent w-[98%] h-4 rounded-xl"></p>
			</div>
			{!lastItem && <div className="absolute bottom-0 left-0 right-0 w-full h-[1px] skeleton"></div>}
		</div>
	)
}
export default SearchListItemLoad