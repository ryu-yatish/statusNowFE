import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/axios';
import { Plus, Edit2, Check } from 'lucide-react';
import { Button } from './ui/button';

function ServiceManagement() {
  const { serviceId } = useParams();
  const [incidents, setIncidents] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [incidentForm, setIncidentForm] = useState({
    service: { id: serviceId },
    description: '',
    status: 'ONGOING'
  });
  const [maintenanceForm, setMaintenanceForm] = useState({
    service: { id: serviceId },
    description: '',
    scheduledTime: '',
    endTime: ''
  });

  useEffect(() => {
    fetchIncidents();
    fetchMaintenances();
  }, [serviceId]);

  const fetchIncidents = async () => {
    try {
      console.log('Current token:', localStorage.getItem('authToken')); // Debug log
      const response = await api.get(`/incidents/service/${serviceId}`);
      setIncidents(response.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
      if (error.response?.status === 401) {
        console.log('Unauthorized - token might be invalid or missing');
      }
    }
  };

  const fetchMaintenances = async () => {
    try {
      console.log('Current token:', localStorage.getItem('authToken')); // Debug log
      const response = await api.get(`/maintenance/service/${serviceId}`);
      setMaintenances(response.data);
    } catch (error) {
      console.error('Error fetching maintenance schedules:', error);
      if (error.response?.status === 401) {
        console.log('Unauthorized - token might be invalid or missing');
      }
    }
  };

  const handleCreateIncident = async (e) => {
    e.preventDefault();
    try {
      console.log('Current token:', localStorage.getItem('authToken')); // Debug log
      await api.post('/incidents', incidentForm);
      setIsIncidentModalOpen(false);
      setIncidentForm({ service: { id: serviceId }, description: '', status: 'ONGOING' });
      fetchIncidents();
    } catch (error) {
      console.error('Error creating incident:', error);
      if (error.response?.status === 401) {
        console.log('Unauthorized - token might be invalid or missing');
      }
    }
  };

  const handleCreateMaintenance = async (e) => {
    e.preventDefault();
    try {
      console.log('Current token:', localStorage.getItem('authToken')); // Debug log
      await api.post('/maintenance', maintenanceForm);
      setIsMaintenanceModalOpen(false);
      setMaintenanceForm({
        service: { id: serviceId },
        description: '',
        scheduledTime: '',
        endTime: ''
      });
      fetchMaintenances();
    } catch (error) {
      console.error('Error creating maintenance:', error);
      if (error.response?.status === 401) {
        console.log('Unauthorized - token might be invalid or missing');
      }
    }
  };

  const handleResolveIncident = async (id) => {
    try {
      console.log('Current token:', localStorage.getItem('authToken')); // Debug log
      await api.patch(`/incidents/${id}/resolve`);
      fetchIncidents();
    } catch (error) {
      console.error('Error resolving incident:', error);
      if (error.response?.status === 401) {
        console.log('Unauthorized - token might be invalid or missing');
      }
    }
  };

  const IncidentModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsIncidentModalOpen(false)} />
      <div className="relative z-50 bg-[aliceblue] rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-bold mb-4">Report New Incident</h2>
        <form onSubmit={handleCreateIncident} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={incidentForm.description}
              onChange={(e) => setIncidentForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-[aliceblue] border rounded-md"
              required
              rows="3"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsIncidentModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );

  const MaintenanceModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsMaintenanceModalOpen(false)} />
      <div className="relative z-50 bg-[aliceblue] rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-bold mb-4">Schedule Maintenance</h2>
        <form onSubmit={handleCreateMaintenance} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={maintenanceForm.description}
              onChange={(e) => setMaintenanceForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-[aliceblue] border rounded-md"
              required
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="datetime-local"
              value={maintenanceForm.scheduledTime}
              onChange={(e) => setMaintenanceForm(prev => ({ ...prev, scheduledTime: e.target.value }))}
              className="w-full px-3 py-2 bg-[aliceblue] border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="datetime-local"
              value={maintenanceForm.endTime}
              onChange={(e) => setMaintenanceForm(prev => ({ ...prev, endTime: e.target.value }))}
              className="w-full px-3 py-2 bg-[aliceblue] border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsMaintenanceModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule</Button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Incidents</h2>
            <Button onClick={() => setIsIncidentModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Report Incident
            </Button>
          </div>
          <div className="grid gap-4">
            {incidents.map((incident) => (
              <div key={incident.id} className="bg-card p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Status: {incident.status}
                    </p>
                  </div>
                  {incident.status !== 'RESOLVED' && (
                    <Button variant="ghost" size="sm" onClick={() => handleResolveIncident(incident.id)}>
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Maintenance Schedule</h2>
            <Button onClick={() => setIsMaintenanceModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Maintenance
            </Button>
          </div>
          <div className="grid gap-4">
            {maintenances.map((maintenance) => (
              <div key={maintenance.id} className="bg-card p-4 rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground">{maintenance.description}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  <p>Start: {new Date(maintenance.scheduledTime).toLocaleString()}</p>
                  <p>End: {new Date(maintenance.endTime).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isIncidentModalOpen && <IncidentModal />}
      {isMaintenanceModalOpen && <MaintenanceModal />}
    </div>
  );
}

export default ServiceManagement;
