import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

function PublicServiceStatus() {
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const endTime = new Date();
        const startTime = new Date(endTime - 24 * 60 * 60 * 1000); // 24 hours ago

        // Format dates to YYYY-MM-DDTHH:mm:ss
        const formatDate = (date) => {
          return date.toISOString().split('.')[0]; // Removes milliseconds
        };

        const response = await axios.get(`http://ec2-3-83-184-204.compute-1.amazonaws.com:8080/api/services/public/${serviceId}/metrics`, {
          params: {
            startTime: formatDate(startTime),
            endTime: formatDate(endTime)
          }
        });
        setServiceData(response.data);
      } catch (err) {
        setError('Failed to fetch service data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceId]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!serviceData) return <div className="text-center mt-8">No data available</div>;

  const getStatusColor = (uptimePercentage) => {
    if (uptimePercentage >= 99) return 'text-green-500';
    if (uptimePercentage >= 95) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{serviceData.serviceName} Status</h1>
      
      <p className="text-sm text-muted-foreground mb-4">
        Showing metrics for the past 24 hours
      </p>
      
      <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-semibold">Current Status</span>
          <span className={`text-xl font-bold ${getStatusColor(serviceData.uptimePercentage)}`}>
            {serviceData.uptimePercentage}% Uptime
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
            <span>{serviceData.activeIncidentsCount} Active Incidents</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            <span>{serviceData.scheduledMaintenanceCount} Scheduled Maintenances</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            <span>{serviceData.uptimePercentage}% Uptime</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Active Incidents</h2>
        {serviceData.incidents.length > 0 ? (
          <ul className="space-y-4">
            {serviceData.incidents.map((incident) => (
              <li key={incident.id} className="bg-card rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{incident.description}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(incident.createdAt).toLocaleString()}
                  </span>
                </div>
                <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                  {incident.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No active incidents</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Scheduled Maintenance</h2>
        {serviceData.maintenanceSchedules.length > 0 ? (
          <ul className="space-y-4">
            {serviceData.maintenanceSchedules.map((maintenance) => (
              <li key={maintenance.id} className="bg-card rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{maintenance.description}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(maintenance.scheduledTime).toLocaleString()} - 
                    {new Date(maintenance.endTime).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No scheduled maintenance</p>
        )}
      </div>
    </div>
  );
}

export default PublicServiceStatus;
