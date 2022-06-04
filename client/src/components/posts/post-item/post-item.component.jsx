import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Collapse, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Redux actions
import { deleteRepair } from '../../../store/actions/Repairs.actions';

// Components
import RepairComments from '../Repair-comments/Repair-comments.component';
import RepairImgCarousel from '../Repair-img-carousel/Repair-img-carousel.component';
import UpdateRepairForm from '../../forms/update-Repair-form/update-Repair-form.component';

import classes from './Repair-item.module.css';

const RepairItem = ({ Repair }) => {
	const user = useSelector(state => state.user.user);
	const dispatch = useDispatch();

	// State
	const [showEditForm, setShowEditForm] = useState(false);

	const formattedDate = new Date(Repair.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});

	const onEditHandler = () => {
		setShowEditForm(true);
	};

	const onDeleteHandler = () => {
		dispatch(deleteRepair(Repair.id));
	};

	return (
		<Card
			actions={
				Repair.userId === user.id && [
					<EditOutlined onClick={onEditHandler} key='edit' />,
					<DeleteOutlined
						onClick={onDeleteHandler}
						style={{ color: '#f85555' }}
						key='delete'
					/>,
				]
			}
			headStyle={{
				background: '#97dddf',
				color: '#114070',
				fontWeight: 'bold',
			}}
			title={Repair.user.name}
			extra={formattedDate}
			hoverable
			className={classes.card}
		>
			{!showEditForm ? (
				<Row>
					<Col span={20}>
						<Card.Meta title={Repair.title} />
						<p>{Repair.content}</p>
					</Col>
					<Col span={4}>
						<Link to={`/profile/${Repair.userId}`}>View profile</Link>
					</Col>
				</Row>
			) : (
				<UpdateRepairForm
					id={Repair.id}
					title={Repair.title}
					content={Repair.content}
					onHideUpdateForm={() => setShowEditForm(false)}
				/>
			)}

			<RepairImgCarousel />

			{/* We'll implement comments later on the module */}
			{/* <Collapse ghost>
				<Collapse.Panel
					header={`View ${Repair.comments.length} comments`}
					key='1'
				>
					<RepairComments RepairId={Repair.id} comments={Repair.comments} />
				</Collapse.Panel>
			</Collapse> */}
		</Card>
	);
};

export default RepairItem;
