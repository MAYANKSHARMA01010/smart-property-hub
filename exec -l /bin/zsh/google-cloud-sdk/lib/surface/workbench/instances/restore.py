# -*- coding: utf-8 -*- #
# Copyright 2024 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""'workbench instances get-config' command."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.workbench import instances as instance_util
from googlecloudsdk.api_lib.workbench import util
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.workbench import flags

DETAILED_HELP = {
    'DESCRIPTION':
        """
        Restores the workbench instance to a snapshot state.
    """,
    'EXAMPLES':
        """
    For valid configurations, run:

        $ {command} example-instance --snapshot-project=example-project --snapshot=example-snapshot --location=us-west1-a
    """,
}


@base.DefaultUniverseOnly
@base.ReleaseTracks(base.ReleaseTrack.GA, base.ReleaseTrack.BETA)
class Restore(base.RestoreCommand):
  """Restores the workbench instance to a snapshot state."""

  @staticmethod
  def Args(parser):
    """Register flags for this command."""
    flags.AddRestoreInstanceFlags(parser)

  def Run(self, args):
    release_track = self.ReleaseTrack()
    client = util.GetClient(release_track)
    messages = util.GetMessages(release_track)
    instance_service = client.projects_locations_instances

    operation = instance_service.Restore(
        instance_util.CreateInstanceRestoreRequest(args, messages))
    return instance_util.HandleLRO(
        operation,
        args,
        instance_service,
        release_track,
        operation_type=instance_util.OperationType.RESTORE)

Restore.detailed_help = DETAILED_HELP
