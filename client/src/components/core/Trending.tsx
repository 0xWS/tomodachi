const Trending: React.FC = () => {
    return (
        <div className="max-w-[24rem] flex items-center mt-3 rounded-lg border border-blue-gray-50 bg-white bg-clip-border text-gray-700 shadow-lg shadow-blue-gray-500/10">
            <ul className="space-y-2 pl-3 mb-3">
                <h4 className="font-sans text-xl mt-2 font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">Trending</h4>
                <li className="items-center">
                  <h3 className="text-sm font-medium">Tomodachi</h3>
                  <p className="text-xs text-gray-500">5M posts</p>
                </li>
                <li className="items-center">
                  <h3 className="text-sm font-medium">X</h3>
                  <p className="text-xs text-gray-500">127M posts</p>
                </li>
                <li className="items-center">
                  <h3 className="text-sm font-medium">Bluesky</h3>
                  <p className="text-xs text-gray-500">2M posts scrapped and keeps going</p>
                </li>
            </ul>
        </div>
    )
}

export default Trending;