import React from 'react';
import { 
  X, 
  Calendar, 
  User, 
  AlertCircle, 
  Clock, 
  FileText, 
  CheckCircle2, 
  UserCircle 
} from 'lucide-react';

const TaskDetails = ({ Task_data, isOpen, isModal }) => {
    if (!isOpen) return null;

    const formatDate = (date) => {
        if (!date) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'done': return 'bg-green-50 text-green-700 border-green-200';
            case 'in-progress': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            default: return 'bg-red-50 text-red-700 border-red-200';
        }
    };

    const getPriorityColor = (priority) => {
        switch(priority?.toLowerCase()) {
            case 'high': return 'bg-red-50 text-red-700 border-red-200';
            case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            default: return 'bg-green-50 text-green-700 border-green-200';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl transform transition-all duration-300">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FileText className="h-6 w-6 text-blue-600" />
                        Task Details
                    </h2>
                    <button
                        onClick={() => isModal(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="space-y-8  ">
                        {/* Title & Description Section */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Title</h3>
                                <p className="text-xl pl-3 font-semibold text-gray-900">{Task_data?.title}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                                <p className="text-gray-700 pl-3 leading-relaxed">{Task_data?.description}</p>
                            </div>
                        </div>

                        {/* Status & Priority Section */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Status
                                </h3>
                                <span className={`inline-flex items-center ml-3 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(Task_data?.status)}`}>
                                    {Task_data?.status}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    Priority
                                </h3>
                                <span className={`inline-flex items-center ml-3 px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(Task_data?.priority)}`}>
                                    {Task_data?.priority}
                                </span>
                            </div>
                        </div>

                        {/* Assignment & Creation Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Assigned to
                                </h3>
                                <p className="text-gray-900 pl-3 font-medium flex items-center gap-2">
                                    {Task_data?.assigned_to?.username || 'Unassigned'}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Created by
                                </h3>
                                <p className="text-gray-900 pl-3 font-medium flex items-center gap-2">
                                    {Task_data?.created_by?.username || 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* Creation Date */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Created Date
                            </h3>
                            <p className="text-gray-900 pl-3 font-medium flex items-center gap-2">
                                {formatDate(Task_data?.created_at)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t p-6 flex justify-end">
                    <button
                        onClick={() => isModal(null)}
                        className="px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;