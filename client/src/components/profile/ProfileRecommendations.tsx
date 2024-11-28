const ProfileRecommendations: React.FC = () => {
    return (
        <div className="max-w-[24rem] flex items-center mt-3 rounded-lg border border-blue-gray-50 bg-white bg-clip-border text-gray-700 shadow-lg shadow-blue-gray-500/10">
            <ul className="space-y-4 list-disc pl-3 mb-3">
                <h4 className="font-sans text-xl mt-2 font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">Recommendations</h4>
                <li className="flex items-center">
                  <img src="http://localhost:3000/default-avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="text-sm font-medium">jesx</h3>
                    <p className="text-xs text-gray-500">@jesx</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <img src="http://localhost:3000/default-avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="text-sm font-medium">jesx</h3>
                    <p className="text-xs text-gray-500">@jesx</p>
                  </div>
                </li>
            </ul>
        </div>
    )
}

export default ProfileRecommendations;