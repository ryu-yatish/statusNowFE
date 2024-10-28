import React, { useState, useEffect } from 'react';
import api from '../utils/axios';  // Make sure this is your axios instance with interceptors
import { Plus, Edit2, Trash2, ExternalLink, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import ServiceModal from './ServiceModal';
import { toast } from 'sonner'; // Make sure to install this package if not already installed

function Dashboard() {
    const [services, setServices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        url: '',
        type: ''
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await api.get('/services');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedService) {
                await api.put(`/services/${selectedService.id}`, formData);
            } else {
                await api.post('/services', formData);
            }
            setIsModalOpen(false);
            setSelectedService(null);
            setFormData({ name: '', description: '', url: '', type: '' });
            fetchServices();
        } catch (error) {
            console.error('Error saving service:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await api.delete(`/services/${id}`);
                fetchServices();
            } catch (error) {
                console.error('Error deleting service:', error);
            }
        }
    };

    const handleEdit = (service) => {
        setSelectedService(service);
        setFormData({
            name: service.name,
            description: service.description,
            url: service.url || '',
            type: service.type || ''
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
        setFormData({ name: '', description: '', url: '', type: '' });
    };

    const handleShare = (serviceId) => {
        const publicUrl = `${window.location.origin}/service/${serviceId}`;
        navigator.clipboard.writeText(publicUrl)
            .then(() => {
                toast.success('Public URL copied to clipboard');
            })
            .catch((error) => {
                console.error('Failed to copy URL:', error);
                toast.error('Failed to copy URL');
            });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Service Management</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                </Button>
            </div>

            <div className="grid gap-4">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-card p-4 rounded-lg shadow-sm flex items-center justify-between"
                    >
                        <div className="flex-grow">
                            <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{service.name}</h3>
                                <Link to={`/manage-service/${service.id}`}>
                                    <Button variant="ghost" size="sm">
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </Link>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleShare(service.id)}
                                >
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                            {service.url && (
                                <a
                                    href={service.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary hover:underline"
                                >
                                    {service.url}
                                </a>
                            )}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                                <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(service.id)}
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                selectedService={selectedService}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default Dashboard;
