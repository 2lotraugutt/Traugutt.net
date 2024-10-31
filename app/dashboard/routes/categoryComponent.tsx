import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function CategoryComponent(props: {
	routesForNav: RouteDataType[];
	routeCategory: { name: string; route: RouteCategoryDataType };
	fetchRoutes: Function;
	editIndex: Function;
	deleteRoutes: Function;
}) {
	function onDragEnd(result: any) {
		if (!result.destination) {
			return;
		}

		const { source, destination } = result;
		const newRoutes = [...props.routesForNav];

		newRoutes.splice(source.index, 1);

		var newIndex: number;
		if (destination.index == 0) newIndex = 0;
		else newIndex = newRoutes[destination.index - 1].index + 1;

		var i = 0;
		newRoutes.forEach((route, index) => {
			if (route.index >= newIndex) {
				props.editIndex(newIndex + i + 1, route.id);
				i++;
			}
		});

		props.editIndex(newIndex, result.draggableId);
	}
	return (
		<div className="border-2 flex flex-col hover:bg-LightGray/40 bg-LightGray/20 transition-all duration-300 py-2.5 px-3.5 lg:p-5 2xl:p-6 3xl:p-8 gap-y-1.5 sm:gap-2 md:gap-3 rounded-2xl">
			<h1 className={`w-full md:text-xl lg:text-2xl xl:text-3xl poppinsFont600`}>{props.routeCategory.name}</h1>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{props.routesForNav.map((route, j) => (
								<Draggable key={route.id} draggableId={route.id} index={j}>
									{(provided) => (
										<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex flex-col relative">
											<div className="flex justify-between">
												<p className={`text-sm sm:text-base md:text-lg flex flex-row lg:text-xl poppinsFont500`}>
													{route.name} {route.index}
												</p>
												<div>
													{/* <FontAwesomeIcon
														onClick={() => {}}
														icon={faPencil}
														className="h-4 me-3 w-4 right-0 cursor-pointer text-MainDarkGray hover:text-MainRed transition-all"
													/> */}
													<FontAwesomeIcon
														onClick={() => props.deleteRoutes(route.id)}
														icon={faTrash}
														className="h-4 w-4 cursor-pointer text-MainDarkGray hover:text-MainRed transition-all"
													/>
												</div>
											</div>
											<Link
												target="blank"
												href={route.link[0] == "/" ? "https://traugutt.net" + route.link : route.link}
												className="text-xs sm:text-sm md:text-base lg:text-lg hover:text-MainColor transition-all"
											>
												{route.link}
											</Link>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}
